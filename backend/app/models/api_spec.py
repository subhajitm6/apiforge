from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class ApiSpec(Base):
    """
    Corresponds to 'files' table in Laravel for backwards compatibility with frontend API,
    while fulfilling the ApiSpec requirement in plan.md.
    """
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    type = Column(String(50), nullable=False)
    base_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="files")
    api_tests = relationship("ApiEndpoint", back_populates="file", cascade="all, delete-orphan")
    test_runs = relationship("TestRun", back_populates="file", cascade="all, delete-orphan")

