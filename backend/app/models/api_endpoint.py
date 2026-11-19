from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class ApiEndpoint(Base):
    """
    Corresponds to 'api_tests' table in Laravel for compatibility with existing frontend expectations,
    while fulfilling the ApiEndpoint requirement.
    """
    __tablename__ = "api_tests"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=True)
    method = Column(String(10), nullable=False)
    endpoint = Column(String(1000), nullable=False)
    headers = Column(JSON, nullable=True)
    request_body = Column(JSON, nullable=True)
    expected_status = Column(Integer, default=200, nullable=False)
    expected_response = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    file = relationship("ApiSpec", back_populates="api_tests")
    results = relationship("TestResult", back_populates="api_test", cascade="all, delete-orphan")

