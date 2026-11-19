from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(Integer, ForeignKey("test_runs.id", ondelete="CASCADE"), nullable=False)
    api_test_id = Column(Integer, ForeignKey("api_tests.id", ondelete="CASCADE"), nullable=False)
    actual_status = Column(Integer, nullable=True)
    expected_status = Column(Integer, nullable=True)
    response_time = Column(Integer, default=0, nullable=False)  # in milliseconds
    result = Column(String(20), nullable=False)  # 'pass' or 'fail'
    error_message = Column(String(2000), nullable=True)
    response_body = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    run = relationship("TestRun", back_populates="results")
    api_test = relationship("ApiEndpoint", back_populates="results")

