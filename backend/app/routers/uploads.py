import os
import shutil
from pathlib import Path
from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status, Body
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.dependencies.authentication import get_current_user
from app.models.user import User
from app.models.api_spec import ApiSpec
from app.services.file_parser import file_parser_service

router = APIRouter(prefix="", tags=["Uploads & Extractor"])

ALLOWED_EXTENSIONS = ["json", "yaml", "yml", "pdf", "docx", "doc", "txt", "md", "markdown"]

@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_file(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    filename = file.filename or "unknown"
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Unsupported file format. Please upload {', '.join(ALLOWED_EXTENSIONS)}."
        )

    file_type = "yaml" if ext == "yml" else ("markdown" if ext == "md" else ext)

    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    user_prefix = str(user.id)
    save_filename = f"{user_prefix}_{int(os.times().system * 1000)}_{filename}"
    save_path = upload_dir / save_filename

    # Save to disk
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Check file size (10MB limit)
    if save_path.stat().st_size > settings.MAX_UPLOAD_SIZE:
        save_path.unlink(missing_ok=True)
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds maximum allowed size (10MB)."
        )

    # Create file record associated with authenticated user
    spec_record = ApiSpec(
        user_id=user.id,
        name=filename,
        file_path=str(save_path),
        type=file_type,
    )
    db.add(spec_record)
    db.commit()
    db.refresh(spec_record)

    # Dynamic extraction
    success = file_parser_service.parse(spec_record, db)
    preview = file_parser_service.extract_preview(save_path, file_type)

    file_response = {
        "id": spec_record.id,
        "name": spec_record.name,
        "file_path": spec_record.file_path,
        "type": spec_record.type,
        "base_url": spec_record.base_url,
        "created_at": spec_record.created_at.isoformat() if spec_record.created_at else None
    }

    return {
        "message": "Upload and parsing successful" if success else "Upload successful, but no endpoints could be discovered.",
        "file": file_response,
        "preview": preview.model_dump()
    }

@router.get("/upload/{spec_id}/preview")
def get_spec_preview(
    spec_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # IDOR Protection: only find if owned by user
    spec = db.query(ApiSpec).filter(ApiSpec.id == spec_id, ApiSpec.user_id == user.id).first()
    if not spec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Specification file not found")
    
    preview = file_parser_service.extract_preview(Path(spec.file_path), spec.type)
    return {
        "spec_id": spec.id,
        "preview": preview.model_dump()
    }

@router.post("/upload/{spec_id}/confirm")
@router.put("/upload/{spec_id}")
def confirm_customized_spec(
    spec_id: int,
    customized_data: Dict[str, Any] = Body(...),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Saves user-modified endpoints, method selections, and Base URL before executing tests.
    Protected against IDOR: only permits modification of user's own spec.
    """
    spec = db.query(ApiSpec).filter(ApiSpec.id == spec_id, ApiSpec.user_id == user.id).first()
    if not spec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Specification file not found")

    success = file_parser_service.save_customized_spec(spec, customized_data, db)
    if not success:
        raise HTTPException(status_code=400, detail="Failed to save custom endpoints")

    return {
        "message": "Specification confirmed and updated successfully",
        "spec_id": spec.id,
        "base_url": spec.base_url
    }

@router.delete("/upload/{spec_id}")
def delete_file(
    spec_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # IDOR Protection: only delete if owned by user
    spec = db.query(ApiSpec).filter(ApiSpec.id == spec_id, ApiSpec.user_id == user.id).first()
    if not spec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Specification file not found")

    try:
        p = Path(spec.file_path)
        if p.exists():
            p.unlink()
    except Exception:
        pass

    db.delete(spec)
    db.commit()
    return {"message": "File deleted successfully", "id": spec_id}
