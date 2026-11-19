from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime
from app.schemas.api_spec import ApiEndpointOut

class TestResultOut(BaseModel):
    id: int
    run_id: int
    api_test_id: int
    actual_status: Optional[int] = None
    expected_status: Optional[int] = None
    response_time: int
    result: str
    error_message: Optional[str] = None
    response_body: Optional[Any] = None
    api_test: Optional[ApiEndpointOut] = None

    class Config:
        from_attributes = True

class TestRunOut(BaseModel):
    id: int
    file_id: int
    fileName: Optional[str] = None
    date: Optional[str] = None
    total: int
    passed: int
    failed: int
    status: Optional[str] = None
    success_rate: Optional[float] = 0.0

    class Config:
        from_attributes = True

