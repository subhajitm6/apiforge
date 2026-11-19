from pathlib import Path
from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session

from app.models.api_spec import ApiSpec
from app.models.api_endpoint import ApiEndpoint
from app.schemas.importer import NormalizedApiSpec
from app.services.universal_extractor import universal_doc_extractor

class FileParserService:
    def extract_preview(self, file_path: Path, file_type: str) -> NormalizedApiSpec:
        """
        Dynamically extracts and returns the normalized API specification preview
        with confidence scores, detected server environments, auth schemes, and endpoints.
        """
        return universal_doc_extractor.extract(file_path, file_type)

    def parse(self, file_record: ApiSpec, db: Session) -> bool:
        """
        Parses document using the Universal Dynamic Extractor and saves normalized
        endpoints to the database.
        """
        file_path = Path(file_record.file_path)
        if not file_path.exists():
            return False

        spec = self.extract_preview(file_path, file_record.type)

        if spec.base_url:
            file_record.base_url = spec.base_url

        endpoints_to_add: List[ApiEndpoint] = []
        for ep in spec.endpoints:
            headers = {"Content-Type": "application/json"} if ep.method in ["POST", "PUT", "PATCH"] else {}
            if spec.global_auth and spec.global_auth.type == "bearer":
                headers["Authorization"] = "Bearer <token>"

            req_body = ep.request_body.example_body if ep.request_body else None

            endpoint = ApiEndpoint(
                file_id=file_record.id,
                name=ep.summary or f"{ep.method} {ep.path}",
                method=ep.method,
                endpoint=ep.path,
                expected_status=ep.expected_status,
                headers=headers if headers else None,
                request_body=req_body
            )
            endpoints_to_add.append(endpoint)

        if endpoints_to_add:
            db.add_all(endpoints_to_add)
            db.commit()
            return True

        return False

    def save_customized_spec(self, file_record: ApiSpec, customized_spec: dict, db: Session) -> bool:
        """
        Saves user-modified endpoints and base URL from the Dynamic Import Preview UI.
        """
        base_url = customized_spec.get("base_url")
        if base_url:
            file_record.base_url = base_url

        # Remove previous endpoints if re-importing
        db.query(ApiEndpoint).filter(ApiEndpoint.file_id == file_record.id).delete()

        endpoints_to_add = []
        for ep in customized_spec.get("endpoints", []):
            endpoint = ApiEndpoint(
                file_id=file_record.id,
                name=ep.get("summary") or f"{ep.get('method')} {ep.get('path')}",
                method=ep.get("method", "GET").upper(),
                endpoint=ep.get("path") or ep.get("endpoint"),
                expected_status=int(ep.get("expected_status", 200)),
                headers=ep.get("headers"),
                request_body=ep.get("request_body")
            )
            endpoints_to_add.append(endpoint)

        if endpoints_to_add:
            db.add_all(endpoints_to_add)
            db.commit()
            return True
        return False

file_parser_service = FileParserService()
