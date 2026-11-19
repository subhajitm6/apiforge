from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.authentication import get_current_user
from app.models.user import User
from app.models.test_run import TestRun
from app.services.report_service import report_service

router = APIRouter(prefix="", tags=["Reports"])

@router.get("/test-report/{run_id}")
def get_report(
    run_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # IDOR Protection: only find if owned by user
    run = db.query(TestRun).filter(TestRun.id == run_id, TestRun.user_id == user.id).first()
    if not run:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test run not found"
        )

    results_list = []
    for res in run.results:
        ep = res.api_test
        results_list.append({
            "id": res.id,
            "run_id": res.run_id,
            "api_test_id": res.api_test_id,
            "actual_status": res.actual_status,
            "expected_status": res.expected_status,
            "response_time": res.response_time,
            "result": res.result,
            "error_message": res.error_message,
            "response_body": res.response_body,
            "api_test": {
                "id": ep.id,
                "file_id": ep.file_id,
                "method": ep.method,
                "endpoint": ep.endpoint,
                "expected_status": ep.expected_status,
                "headers": ep.headers,
                "request_body": ep.request_body,
            } if ep else None
        })

    return {
        "id": run.id,
        "file_id": run.file_id,
        "user_id": run.user_id,
        "total": run.total,
        "passed": run.passed,
        "failed": run.failed,
        "success_rate": run.success_rate,
        "execution_status": run.execution_status,
        "created_at": run.created_at.isoformat() if run.created_at else None,
        "file": {
            "id": run.file.id,
            "name": run.file.name,
            "type": run.file.type,
            "file_path": run.file.file_path,
        } if run.file else None,
        "results": results_list
    }

@router.get("/test-report/{run_id}/download")
def download_report_pdf(
    run_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # IDOR Protection: only allow download if owned by user
    run = db.query(TestRun).filter(TestRun.id == run_id, TestRun.user_id == user.id).first()
    if not run:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test run not found"
        )

    pdf_bytes = report_service.generate_pdf(run)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=test_report_{run.id}.pdf"}
    )

@router.delete("/test-report/{run_id}")
def delete_report(
    run_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # IDOR Protection: only allow delete if owned by user
    run = db.query(TestRun).filter(TestRun.id == run_id, TestRun.user_id == user.id).first()
    if not run:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test run not found"
        )

    db.delete(run)
    db.commit()
    return {"message": "Test run deleted successfully"}
