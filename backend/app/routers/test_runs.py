from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.authentication import get_current_user
from app.models.user import User
from app.models.api_spec import ApiSpec
from app.models.test_run import TestRun
from app.services.api_test_engine import api_test_engine

router = APIRouter(prefix="", tags=["Test Execution"])

@router.post("/run-test/{file_id}")
async def run_test(
    file_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # IDOR Protection: only allow running tests on specs owned by authenticated user
    file_record = db.query(ApiSpec).filter(ApiSpec.id == file_id, ApiSpec.user_id == user.id).first()
    if not file_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Specification file not found"
        )

    test_run = await api_test_engine.execute_run(file_record, user.id, db)

    # Serialize matching the Laravel response format:
    # { message: '...', run: { ..., results: [ { ..., api_test: { ... } } ] } }
    results_list = []
    for res in test_run.results:
        ep = res.api_test
        results_list.append({
            "id": res.id,
            "run_id": res.run_id,
            "api_test_id": res.api_test_id,
            "actual_status": res.actual_status,
            "response_time": res.response_time,
            "result": res.result,
            "error_message": res.error_message,
            "response_body": res.response_body,
            "api_test": {
                "id": ep.id,
                "file_id": ep.file_id,
                "method": ep.method,
                "endpoint": ep.endpoint,
                "expected_status": ep.expected_status,
                "headers": ep.headers,
                "request_body": ep.request_body,
            } if ep else None
        })

    return {
        "message": "Test run completed",
        "run": {
            "id": test_run.id,
            "file_id": test_run.file_id,
            "user_id": test_run.user_id,
            "total": test_run.total,
            "passed": test_run.passed,
            "failed": test_run.failed,
            "success_rate": test_run.success_rate,
            "execution_status": test_run.execution_status,
            "started_at": test_run.started_at.isoformat() if test_run.started_at else None,
            "completed_at": test_run.completed_at.isoformat() if test_run.completed_at else None,
            "results": results_list
        }
    }

