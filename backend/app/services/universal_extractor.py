import re
import json
import yaml
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
from urllib.parse import urlparse
from pypdf import PdfReader

try:
    import docx
except ImportError:
    docx = None

from app.schemas.importer import (
    NormalizedApiSpec, NormalizedEndpoint, ServerEnvironment, 
    AuthRequirement, ParameterDefinition, RequestBodyDefinition, 
    ResponseDefinition, SourceReference
)

class UniversalDocExtractor:
    """
    Generalized Dynamic API Documentation Importer & Normalization Engine.
    Understands PDF, DOCX, Markdown, Text, OpenAPI/Swagger JSON/YAML dynamically.
    Extracts Base URLs, Multiple Environments, Authentication, Endpoints, 
    Schemas, Status Codes, and Source Traceability.
    """

    HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]

    def extract(self, file_path: Path, format_type: str) -> NormalizedApiSpec:
        format_type = format_type.lower()
        if format_type in ("json", "yaml", "yml"):
            return self._extract_structured(file_path, format_type)
        elif format_type == "pdf":
            return self._extract_pdf(file_path)
        elif format_type in ("docx", "doc"):
            return self._extract_docx(file_path)
        elif format_type in ("md", "markdown", "txt"):
            return self._extract_text(file_path)
        else:
            # Fallback text attempt
            return self._extract_text(file_path)

    # =========================================================================
    # 1. STRUCTURED SPECIFICATIONS (OpenAPI 3.x & Swagger 2.0)
    # =========================================================================
    def _extract_structured(self, file_path: Path, format_type: str) -> NormalizedApiSpec:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
        data = None
        if format_type == "json":
            try:
                data = json.loads(content)
            except Exception:
                try:
                    data = yaml.safe_load(content)
                except Exception:
                    pass
        else:
            try:
                data = yaml.safe_load(content)
            except Exception:
                try:
                    data = json.loads(content)
                except Exception:
                    pass

        if not isinstance(data, dict):
            return self._extract_text_content(content, source_name=file_path.name)

        title = data.get("info", {}).get("title") or "Imported API"
        version = data.get("info", {}).get("version") or "1.0.0"
        description = data.get("info", {}).get("description")

        servers: List[ServerEnvironment] = []
        base_url = None

        # OpenAPI 3.x servers
        if "servers" in data and isinstance(data["servers"], list):
            for idx, s in enumerate(data["servers"]):
                if isinstance(s, dict) and "url" in s:
                    s_url = s["url"]
                    s_desc = s.get("description") or f"Server {idx+1}"
                    env = ServerEnvironment(
                        name=f"Env {idx+1}: {s_desc}",
                        url=s_url,
                        description=s_desc,
                        source_ref=SourceReference(
                            field="server",
                            value=s_url,
                            source_type="openapi_servers",
                            confidence=1.0,
                            inference_type="explicit"
                        )
                    )
                    servers.append(env)
            if servers:
                base_url = servers[0].url

        # Swagger 2.0 host and basePath
        elif "host" in data:
            schemes = data.get("schemes", ["https"])
            scheme = schemes[0] if schemes else "https"
            base_path = data.get("basePath", "")
            base_url = f"{scheme}://{data['host']}{base_path}".rstrip("/")
            servers.append(
                ServerEnvironment(
                    name="Swagger 2.0 Default",
                    url=base_url,
                    description="Derived from host and basePath",
                    source_ref=SourceReference(
                        field="base_url",
                        value=base_url,
                        source_type="swagger_host",
                        confidence=1.0,
                        inference_type="explicit"
                    )
                )
            )

        # Global Auth Extraction
        global_auth = self._extract_openapi_security(data)

        # Endpoints Extraction
        endpoints: List[NormalizedEndpoint] = []
        paths = data.get("paths", {})
        if isinstance(paths, dict):
            for path_str, path_item in paths.items():
                if not isinstance(path_item, dict):
                    continue
                for method in self.HTTP_METHODS:
                    m_lower = method.lower()
                    if m_lower in path_item and isinstance(path_item[m_lower], dict):
                        op = path_item[m_lower]
                        summary = op.get("summary") or op.get("operationId") or f"{method} {path_str}"
                        desc = op.get("description")
                        tags = op.get("tags", [])

                        # Parameters
                        parameters: List[ParameterDefinition] = []
                        raw_params = op.get("parameters", [])
                        if isinstance(raw_params, list):
                            for p in raw_params:
                                if isinstance(p, dict) and "name" in p:
                                    parameters.append(ParameterDefinition(
                                        name=p["name"],
                                        location=p.get("in", "query"),
                                        required=bool(p.get("required", False)),
                                        param_type=p.get("schema", {}).get("type", "string") if isinstance(p.get("schema"), dict) else "string",
                                        description=p.get("description")
                                    ))

                        # Request Body
                        req_body_def = None
                        if "requestBody" in op and isinstance(op["requestBody"], dict):
                            content_obj = op["requestBody"].get("content", {})
                            c_type = "application/json"
                            schema_obj = None
                            example_obj = None
                            if "application/json" in content_obj:
                                schema_obj = content_obj["application/json"].get("schema")
                                example_obj = content_obj["application/json"].get("example")
                            elif content_obj:
                                first_ct = list(content_obj.keys())[0]
                                c_type = first_ct
                                schema_obj = content_obj[first_ct].get("schema")
                                example_obj = content_obj[first_ct].get("example")
                            req_body_def = RequestBodyDefinition(
                                content_type=c_type,
                                schema_definition=schema_obj,
                                example_body=example_obj
                            )

                        # Responses & expected status
                        responses_list: List[ResponseDefinition] = []
                        expected_status = 200
                        raw_responses = op.get("responses", {})
                        if isinstance(raw_responses, dict):
                            for s_code, resp_obj in raw_responses.items():
                                try:
                                    code_int = int(s_code)
                                    if 200 <= code_int < 300:
                                        expected_status = code_int
                                    resp_desc = resp_obj.get("description") if isinstance(resp_obj, dict) else ""
                                    responses_list.append(ResponseDefinition(
                                        status_code=code_int,
                                        description=resp_desc
                                    ))
                                except ValueError:
                                    continue

                        endpoint_obj = NormalizedEndpoint(
                            id=f"{method}_{path_str}",
                            method=method,
                            path=path_str,
                            summary=summary,
                            description=desc,
                            tags=tags,
                            parameters=parameters,
                            request_body=req_body_def,
                            responses=responses_list,
                            expected_status=expected_status,
                            auth=global_auth,
                            source_ref=SourceReference(
                                field="endpoint",
                                value=f"{method} {path_str}",
                                source_type="openapi_path",
                                confidence=1.0,
                                inference_type="explicit"
                            )
                        )
                        endpoints.append(endpoint_obj)

        return NormalizedApiSpec(
            title=title,
            version=version,
            description=description,
            base_url=base_url,
            servers=servers,
            global_auth=global_auth,
            endpoints=endpoints,
            format_type="OpenAPI/Swagger",
            confidence_score=0.98 if endpoints else 0.5
        )

    def _extract_openapi_security(self, data: dict) -> Optional[AuthRequirement]:
        sec_schemes = (
            data.get("components", {}).get("securitySchemes", {})
            or data.get("securityDefinitions", {})
        )
        if isinstance(sec_schemes, dict) and sec_schemes:
            for s_name, s_def in sec_schemes.items():
                if not isinstance(s_def, dict):
                    continue
                s_type = s_def.get("type", "").lower()
                scheme = s_def.get("scheme", "").lower()
                if s_type == "http" and scheme == "bearer":
                    return AuthRequirement(
                        type="bearer",
                        name=s_name,
                        location="header",
                        header_name="Authorization",
                        token_prefix="Bearer ",
                        description="HTTP Bearer Token Authentication"
                    )
                elif s_type == "apikey":
                    return AuthRequirement(
                        type="apiKey",
                        name=s_name,
                        location=s_def.get("in", "header"),
                        header_name=s_def.get("name", "X-API-Key"),
                        token_prefix=""
                    )
                elif s_type in ("oauth2", "oauth2.1"):
                    return AuthRequirement(
                        type="oauth2",
                        name=s_name,
                        location="header",
                        header_name="Authorization",
                        token_prefix="Bearer "
                    )
        return None

    # =========================================================================
    # 2. PDF EXTRACTION (Page-aware, structured text, sections & curl examples)
    # =========================================================================
    def _extract_pdf(self, file_path: Path) -> NormalizedApiSpec:
        reader = PdfReader(str(file_path))
        page_texts: List[Tuple[int, str]] = []
        for i, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            page_texts.append((i + 1, text))

        return self._analyze_unstructured_document(page_texts, default_title=file_path.stem)

    # =========================================================================
    # 3. DOCX & TEXT / MARKDOWN EXTRACTION
    # =========================================================================
    def _extract_docx(self, file_path: Path) -> NormalizedApiSpec:
        if not docx:
            return self._extract_text(file_path)
        doc = docx.Document(str(file_path))
        full_text = []
        for p in doc.paragraphs:
            if p.text:
                full_text.append(p.text)
        for table in doc.tables:
            for row in table.rows:
                row_text = " | ".join([cell.text.strip() for cell in row.cells if cell.text.strip()])
                if row_text:
                    full_text.append(row_text)

        combined = "\n".join(full_text)
        return self._analyze_unstructured_document([(1, combined)], default_title=file_path.stem)

    def _extract_text(self, file_path: Path) -> NormalizedApiSpec:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
        return self._analyze_unstructured_document([(1, content)], default_title=file_path.stem)

    # =========================================================================
    # 4. DYNAMIC DOCUMENT INTELLIGENCE (Contextual Heuristics & Traceability)
    # =========================================================================
    def _analyze_unstructured_document(
        self, pages: List[Tuple[int, str]], default_title: str
    ) -> NormalizedApiSpec:
        full_text = "\n\n".join([f"=== PAGE {p_num} ===\n{txt}" for p_num, txt in pages])
        
        # 1. API Title & Version Detection
        title, version, title_ref = self._detect_title_and_version(pages, default_title)

        # 2. Base URLs & Multiple Environments
        base_url, servers, server_refs = self._detect_base_urls(pages)

        # 3. Authentication Discovery
        global_auth = self._detect_authentication(pages)

        # 4. Endpoint Discovery
        endpoints = self._detect_endpoints(pages, base_url, global_auth)

        # 5. Extraction Summary & Confidence
        confidence = 0.90 if (base_url and endpoints) else (0.75 if endpoints else 0.40)
        uncertain = []
        missing = []
        if not base_url:
            missing.append("Base URL not explicitly identified")
        if not endpoints:
            missing.append("No API endpoints discovered")

        all_sources: List[SourceReference] = []
        if title_ref:
            all_sources.append(title_ref)
        all_sources.extend(server_refs)

        return NormalizedApiSpec(
            title=title,
            version=version,
            description=f"Extracted dynamically from {default_title}",
            base_url=base_url,
            servers=servers,
            global_auth=global_auth,
            endpoints=endpoints,
            format_type="Document",
            confidence_score=confidence,
            extraction_sources=all_sources,
            uncertain_fields=uncertain,
            missing_fields=missing
        )

    def _detect_title_and_version(
        self, pages: List[Tuple[int, str]], default_title: str
    ) -> Tuple[str, str, Optional[SourceReference]]:
        first_page = pages[0][1] if pages else ""
        first_lines = [l.strip() for l in first_page.split("\n") if l.strip()]

        title = default_title.replace("_", " ").replace("-", " ")
        version = "1.0.0"
        ref = None

        # Look for explicit Title and Version indicators
        for line in first_lines[:15]:
            v_match = re.search(r'v?(\d+\.\d+(?:\.\d+)?)', line, re.IGNORECASE)
            if v_match:
                version = v_match.group(1)
            
            cleaned = re.sub(r'v?\d+\.\d+(?:\.\d+)?.*$', '', line).strip()
            cleaned = re.sub(r'(\|.*|REST API Documentation.*)', '', cleaned).strip()
            if len(cleaned) > 3 and not re.match(r'^(page|table|contents|index)', cleaned, re.IGNORECASE):
                title = cleaned
                ref = SourceReference(
                    field="title",
                    value=title,
                    source_page=pages[0][0],
                    confidence=0.92,
                    inference_type="explicit"
                )
                break

        return title, version, ref

    def _detect_base_urls(
        self, pages: List[Tuple[int, str]]
    ) -> Tuple[Optional[str], List[ServerEnvironment], List[SourceReference]]:
        servers: List[ServerEnvironment] = []
        server_refs: List[SourceReference] = []
        seen_urls = set()

        url_patterns = [
            # High-confidence Server / Base URL indicators (internationalized & multi-terminology)
            re.compile(r'(?:base\s*url|api\s*base|server\s*(?:address|url|environment)?|servidor|host|root\s*endpoint|gateway|direccion|environment)\s*[:=\-\n\s]+(https?://[^\s\'"\<\>\`]+)', re.IGNORECASE),
            # Environment labels like "Production: https://..." or "Staging: https://..."
            re.compile(r'(?:production|staging|sandbox|development|dev|prod)\s*[:=\-\n\s]+(https?://[^\s\'"\<\>\`]+)', re.IGNORECASE),
            # cURL command pattern: curl -X POST https://api.example.com/v1/tasks
            re.compile(r'curl\s+[^\n]*?(https?://[^\s\'"\<\>\`]+)', re.IGNORECASE),
            # Any HTTP/HTTPS URL found in document
            re.compile(r'(https?://[a-zA-Z0-9\-\.]+(?:\:[0-9]+)?(?:/[a-zA-Z0-9_\-\.]+)*)', re.IGNORECASE)
        ]

        # Scan page by page for highest confidence Base URL labels
        for p_num, text in pages:
            # Check labelled Base URLs first (Priority 1)
            for pat_idx, pat in enumerate(url_patterns[:3]):
                matches = pat.findall(text)
                for m in matches:
                    clean_url = m.rstrip(".,;)'\"")
                    if clean_url not in seen_urls:
                        seen_urls.add(clean_url)
                        ref = SourceReference(
                            field="base_url",
                            value=clean_url,
                            source_page=p_num,
                            source_type="labeled_text",
                            confidence=0.98 if pat_idx == 0 else 0.90,
                            inference_type="explicit"
                        )
                        server_refs.append(ref)
                        servers.append(ServerEnvironment(
                            name=f"Server {len(servers)+1}",
                            url=clean_url,
                            description=f"Discovered on Page {p_num}",
                            source_ref=ref
                        ))

            # If no labeled servers found yet, check generic URLs (Priority 4)
            if not servers:
                raw_urls = url_patterns[3].findall(text)
                for u in raw_urls:
                    clean_u = u.rstrip(".,;)'\"")
                    # Ignore schema definitions
                    if "schema.org" in clean_u or "w3.org" in clean_u:
                        continue
                    if clean_u not in seen_urls:
                        seen_urls.add(clean_u)
                        ref = SourceReference(
                            field="base_url",
                            value=clean_u,
                            source_page=p_num,
                            source_type="discovered_url",
                            confidence=0.75,
                            inference_type="inferred"
                        )
                        server_refs.append(ref)
                        servers.append(ServerEnvironment(
                            name=f"Detected Server {len(servers)+1}",
                            url=clean_u,
                            description=f"Detected on Page {p_num}",
                            source_ref=ref
                        ))

        primary_base_url = servers[0].url if servers else None
        return primary_base_url, servers, server_refs

    def _detect_authentication(self, pages: List[Tuple[int, str]]) -> Optional[AuthRequirement]:
        for p_num, text in pages:
            lower = text.lower()
            if "bearer token" in lower or "bearer <" in lower or "authorization: bearer" in lower or "jwt" in lower:
                return AuthRequirement(
                    type="bearer",
                    name="JWT / Bearer Token",
                    location="header",
                    header_name="Authorization",
                    token_prefix="Bearer ",
                    description="Bearer JWT authentication detected in document",
                    source_ref=SourceReference(
                        field="auth",
                        value="Bearer JWT",
                        source_page=p_num,
                        confidence=0.95,
                        inference_type="explicit"
                    )
                )
            elif "api-key" in lower or "x-api-key" in lower or "apikey" in lower:
                return AuthRequirement(
                    type="apiKey",
                    name="API Key Authentication",
                    location="header",
                    header_name="X-API-Key",
                    token_prefix="",
                    source_ref=SourceReference(
                        field="auth",
                        value="API Key",
                        source_page=p_num,
                        confidence=0.90,
                        inference_type="explicit"
                    )
                )
            elif "basic auth" in lower or "authorization: basic" in lower:
                return AuthRequirement(
                    type="basic",
                    name="Basic Authentication",
                    location="header",
                    header_name="Authorization",
                    token_prefix="Basic "
                )
        return None

    def _detect_endpoints(
        self, pages: List[Tuple[int, str]], base_url: Optional[str], global_auth: Optional[AuthRequirement]
    ) -> List[NormalizedEndpoint]:
        endpoints: List[NormalizedEndpoint] = []
        seen_keys = set()

        method_pattern = "|".join(self.HTTP_METHODS)
        # Matches patterns like:
        # POST  /auth/login
        # GET  /tasks/{id}
        # DELETE /tasks/{id}
        endpoint_regex = re.compile(
            r'(?:\b|^)(' + method_pattern + r')\s+([a-zA-Z0-9_\-\.\/\{\}]+)', 
            re.IGNORECASE
        )

        for p_num, page_text in pages:
            lines = page_text.split("\n")
            for i, line in enumerate(lines):
                line_clean = line.strip()
                match = endpoint_regex.search(line_clean)
                if match:
                    method = match.group(1).upper()
                    path = match.group(2).strip()

                    # Filter out non-endpoint matches like "GET /" without API context if invalid
                    if not path.startswith("/") and not (path.startswith("http://") or path.startswith("https://")):
                        continue
                    if path.lower().endswith((".png", ".jpg", ".css", ".js")):
                        continue
                    # Ignore standalone schemes like "POST https"
                    if path.lower() in ("http", "https", "http:", "https:"):
                        continue

                    key = (method, path)
                    if key in seen_keys:
                        continue
                    seen_keys.add(key)

                    # Extract context (surrounding lines)
                    context_chunk = "\n".join(lines[max(0, i-2) : min(len(lines), i+18)])
                    
                    # 1. Summary / Description
                    summary = ""
                    if i + 1 < len(lines) and lines[i+1].strip() and not endpoint_regex.search(lines[i+1]):
                        summary = lines[i+1].strip()
                    else:
                        summary = f"{method} {path}"

                    # 2. Path parameters
                    parameters: List[ParameterDefinition] = []
                    path_params = re.findall(r'\{([a-zA-Z0-9_]+)\}', path)
                    for pp in path_params:
                        parameters.append(ParameterDefinition(
                            name=pp,
                            location="path",
                            required=True,
                            param_type="string",
                            description=f"Path parameter {pp}"
                        ))

                    # 3. Request body detection from JSON block in context
                    req_body = self._extract_json_block(context_chunk, "request")

                    # 4. Response & status code detection
                    expected_status, responses = self._extract_status_codes(context_chunk, method)

                    endpoints.append(NormalizedEndpoint(
                        id=f"{method}_{path}",
                        method=method,
                        path=path,
                        summary=summary,
                        description=summary,
                        parameters=parameters,
                        request_body=req_body,
                        responses=responses,
                        expected_status=expected_status,
                        auth=global_auth,
                        source_ref=SourceReference(
                            field="endpoint",
                            value=f"{method} {path}",
                            source_page=p_num,
                            confidence=0.95,
                            inference_type="explicit"
                        )
                    ))

        return endpoints

    def _extract_json_block(self, text: str, context_type: str = "request") -> Optional[RequestBodyDefinition]:
        # Search for {...} JSON structure
        json_matches = re.findall(r'(\{[^{}]*\{[^{}]*\}[^{}]*\}|\{[^{}]*\})', text, re.DOTALL)
        for j_str in json_matches:
            try:
                parsed = json.loads(j_str)
                if isinstance(parsed, dict):
                    # Check if error or response
                    if context_type == "request" and ("error" in parsed or "code" in parsed):
                        continue
                    return RequestBodyDefinition(
                        content_type="application/json",
                        example_body=parsed,
                        required_fields=list(parsed.keys())
                    )
            except Exception:
                continue
        return None

    def _extract_status_codes(self, text: str, method: str) -> Tuple[int, List[ResponseDefinition]]:
        default_status = 201 if method.upper() == "POST" else (204 if method.upper() == "DELETE" else 200)
        responses: List[ResponseDefinition] = []

        # Look for "(200 OK)", "(201 Created)", "(204 No Content)", etc.
        matches = re.findall(r'\((\d{3})\s*([A-Za-z\s]+)?\)', text)
        for m in matches:
            code = int(m[0])
            desc = m[1].strip() if m[1] else "Success"
            responses.append(ResponseDefinition(status_code=code, description=desc))
            if 200 <= code < 300:
                default_status = code

        if not responses:
            responses.append(ResponseDefinition(status_code=default_status, description="Success"))

        return default_status, responses

universal_doc_extractor = UniversalDocExtractor()
