from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime

class ApiEndpointOut(BaseModel):
    id: int
    file_id: int
    name: Optional[str] = None
    method: str
    endpoint: str
    headers: Optional[Any] = None
    request_body: Optional[Any] = None
    expected_status: int = 200

    class Config:
        from_attributes = True

class ApiSpecOut(BaseModel):
    id: int
    user_id: Optional[int] = None
    name: str
    file_path: str
    type: str
    base_url: Optional[str] = None
    created_at: Optional[datetime] = None
    test_runs_count: Optional[int] = 0

    class Config:
        from_attributes = True

