from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class SourceReference(BaseModel):
    field: str
    value: Any
    source_type: str = "text"  # "text", "table", "code_block", "openapi", "curl"
    source_page: Optional[int] = None
    confidence: float = 1.0
    inference_type: str = "explicit"  # "explicit", "inferred", "generated", "missing"

class ServerEnvironment(BaseModel):
    name: str = "Default"
    url: str
    description: Optional[str] = None
    source_ref: Optional[SourceReference] = None

class AuthRequirement(BaseModel):
    type: str = "none"  # "bearer", "jwt", "apiKey", "basic", "oauth2", "none", "custom"
    name: Optional[str] = None
    location: Optional[str] = "header"  # "header", "query", "cookie"
    header_name: Optional[str] = "Authorization"
    token_prefix: Optional[str] = "Bearer "
    token_url: Optional[str] = None
    description: Optional[str] = None
    source_ref: Optional[SourceReference] = None

class ParameterDefinition(BaseModel):
    name: str
    location: str = "query"  # "query", "path", "header", "cookie"
    required: bool = False
    param_type: str = "string"
    description: Optional[str] = None
    example: Optional[Any] = None

class RequestBodyDefinition(BaseModel):
    content_type: str = "application/json"
    schema_definition: Optional[Dict[str, Any]] = None
    example_body: Optional[Any] = None
    required_fields: List[str] = Field(default_factory=list)
    source_ref: Optional[SourceReference] = None

class ResponseDefinition(BaseModel):
    status_code: int = 200
    description: Optional[str] = None
    content_type: Optional[str] = "application/json"
    example_response: Optional[Any] = None
    schema_definition: Optional[Dict[str, Any]] = None

class NormalizedEndpoint(BaseModel):
    id: Optional[str] = None
    method: str  # GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
    path: str  # /tasks or https://...
    summary: Optional[str] = None
    description: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    parameters: List[ParameterDefinition] = Field(default_factory=list)
    request_body: Optional[RequestBodyDefinition] = None
    responses: List[ResponseDefinition] = Field(default_factory=list)
    expected_status: int = 200
    auth: Optional[AuthRequirement] = None
    source_ref: Optional[SourceReference] = None

class NormalizedApiSpec(BaseModel):
    title: str = "Imported API"
    version: str = "1.0.0"
    description: Optional[str] = None
    base_url: Optional[str] = None
    servers: List[ServerEnvironment] = Field(default_factory=list)
    global_auth: Optional[AuthRequirement] = None
    endpoints: List[NormalizedEndpoint] = Field(default_factory=list)
    format_type: str = "unknown"
    confidence_score: float = 1.0
    extraction_sources: List[SourceReference] = Field(default_factory=list)
    uncertain_fields: List[str] = Field(default_factory=list)
    missing_fields: List[str] = Field(default_factory=list)
    conflicts: List[str] = Field(default_factory=list)
