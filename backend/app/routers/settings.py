from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from app.dependencies.authentication import get_current_user
from app.models.user import User

router = APIRouter(prefix="/settings", tags=["Settings"])

class AppSettings(BaseModel):
    theme: Optional[str] = "light"
    notifications_enabled: Optional[bool] = True
    default_timeout: Optional[int] = 10

@router.get("")
def get_user_settings(user: User = Depends(get_current_user)):
    return {
        "theme": "light",
        "notifications_enabled": True,
        "default_timeout": 10
    }

@router.post("")
def update_user_settings(settings: AppSettings, user: User = Depends(get_current_user)):
    return {"message": "Settings updated", "settings": settings.model_dump()}

