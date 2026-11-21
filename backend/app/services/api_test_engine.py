import time
import httpx
from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.api_spec import ApiSpec
from app.models.api_endpoint import ApiEndpoint
from app.models.test_run import TestRun
from app.models.test_result import TestResult
from app.utils.validators import is_safe_url

class ApiTestEngine:
    async def execute_run(
        self,
        file_spec: ApiSpec,
        user_id: int,
        db: Session,
        test_id: str = None,
        auth_token: str = None
    ) -> TestRun:
        endpoints = db.query(ApiEndpoint).filter(ApiEndpoint.file_id == file_spec.id).all()
        
        test_run = TestRun(
            file_id=file_spec.id,
            user_id=user_id,
            total=len(endpoints),
            passed=0,
            failed=0,
            execution_status="running",
            started_at=datetime.now(timezone.utc)
        )
        db.add(test_run)
        db.commit()
        db.refresh(test_run)

        passed_count = 0
        failed_count = 0

        # Base URL resolution from spec
        default_base = (file_spec.base_url or "").rstrip("/")
        if not default_base:
            # If no base_url was extracted from the spec, endpoints must specify full URL or fail
            pass

        timeout = httpx.Timeout(10.0, connect=5.0)
        
        # Track dynamically discovered resource IDs from GET responses (e.g. from /comments)
        discovered_id = str(test_id).strip() if test_id else None

        async with httpx.AsyncClient(timeout=timeout, follow_redirects=False) as client:
            for ep in endpoints:
                start_time = time.perf_counter()
                
                # Format URL and substitute path parameters like {id} with user-provided test_id or sample ID
                import re
                replacement_id = discovered_id
                if not replacement_id and ep.request_body and isinstance(ep.request_body, dict):
                    replacement_id = ep.request_body.get("id") or ep.request_body.get("uuid")
                if not replacement_id:
                    replacement_id = "1"

                endpoint_str = re.sub(r'\{[a-zA-Z0-9_]+\}', str(replacement_id), ep.endpoint.strip())
                if endpoint_str.startswith("http://") or endpoint_str.startswith("https://"):
                    full_url = endpoint_str
                elif default_base:
                    endpoint_path = endpoint_str if endpoint_str.startswith("/") else f"/{endpoint_str}"
                    full_url = f"{default_base}{endpoint_path}"
                else:
                    duration_ms = round((time.perf_counter() - start_time) * 1000)
                    result = TestResult(
                        run_id=test_run.id,
                        api_test_id=ep.id,
                        actual_status=None,
                        expected_status=ep.expected_status,
                        response_time=duration_ms,
                        result="fail",
                        error_message="Missing base URL: specification does not define a server host or base URL.",
                        response_body=None
                    )
                    db.add(result)
                    failed_count += 1
                    continue

                # SSRF Protection Check
                safe, error_reason = is_safe_url(full_url)
                if not safe:
                    duration_ms = round((time.perf_counter() - start_time) * 1000)
                    result = TestResult(
                        run_id=test_run.id,
                        api_test_id=ep.id,
                        actual_status=None,
                        expected_status=ep.expected_status,
                        response_time=duration_ms,
                        result="fail",
                        error_message=error_reason or "SSRF Protection: Target URL or IP address is restricted.",
                        response_body=None
                    )
                    db.add(result)
                    failed_count += 1
                    continue

                try:
                    headers = dict(ep.headers or {})
                    if auth_token:
                        headers["Authorization"] = f"Bearer {auth_token}" if not auth_token.startswith("Bearer ") else auth_token
                    else:
                        # Strip dummy/placeholder tokens so public reads don't fail with 401
                        auth_val = str(headers.get("Authorization", ""))
                        if any(ph in auth_val for ph in ["<token>", "YOUR_TOKEN", "your_token", "Bearer token"]):
                            headers.pop("Authorization", None)

                    req_kwargs = {
                        "headers": headers,
                    }
                    if ep.method.upper() in ["POST", "PUT", "PATCH"] and ep.request_body:
                        req_kwargs["json"] = ep.request_body

                    response = await client.request(
                        method=ep.method.upper(),
                        url=full_url,
                        **req_kwargs
                    )
                    duration_ms = round((time.perf_counter() - start_time) * 1000)

                    actual_status = response.status_code
                    is_success = (actual_status == ep.expected_status)

                    resp_body = None
                    try:
                        resp_body = response.json()
                        # If no test_id was given, auto-discover resource ID from GET list responses for subsequent tests
                        if not test_id and ep.method.upper() == "GET" and actual_status == 200:
                            items = None
                            if isinstance(resp_body, list):
                                items = resp_body
                            elif isinstance(resp_body, dict):
                                items = resp_body.get("data") or resp_body.get("items") or resp_body.get("results")
                            if items and isinstance(items, list) and len(items) > 0 and isinstance(items[0], dict):
                                discovered_id = items[0].get("id") or items[0].get("uuid")
                    except Exception:
                        resp_body = response.text
                    except Exception:
                        resp_body = {"text": response.text[:2000]}

                    result = TestResult(
                        run_id=test_run.id,
                        api_test_id=ep.id,
                        actual_status=actual_status,
                        expected_status=ep.expected_status,
                        response_time=duration_ms,
                        result="pass" if is_success else "fail",
                        error_message=None if is_success else f"Expected status {ep.expected_status}, received {actual_status}",
                        response_body=resp_body
                    )
                    db.add(result)
                    if is_success:
                        passed_count += 1
                    else:
                        failed_count += 1

                except httpx.RequestError as exc:
                    duration_ms = round((time.perf_counter() - start_time) * 1000)
                    result = TestResult(
                        run_id=test_run.id,
                        api_test_id=ep.id,
                        actual_status=None,
                        expected_status=ep.expected_status,
                        response_time=duration_ms,
                        result="fail",
                        error_message=f"Request error: {str(exc)}",
                        response_body=None
                    )
                    db.add(result)
                    failed_count += 1

        test_run.passed = passed_count
        test_run.failed = failed_count
        test_run.execution_status = "completed"
        test_run.completed_at = datetime.now(timezone.utc)
        total = test_run.total
        test_run.success_rate = round((passed_count / total * 100), 1) if total > 0 else 0.0

        db.commit()
        db.refresh(test_run)
        return test_run

api_test_engine = ApiTestEngine()

