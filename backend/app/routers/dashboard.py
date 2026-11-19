from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta, timezone

from app.core.database import get_db
from app.dependencies.authentication import get_current_user
from app.models.user import User
from app.models.api_spec import ApiSpec
from app.models.api_endpoint import ApiEndpoint
from app.models.test_run import TestRun
from app.models.test_result import TestResult

router = APIRouter(prefix="", tags=["Stats & Runs"])

@router.get("/stats")
def get_stats(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Scope exclusively to authenticated user
    total_apis = (
        db.query(ApiEndpoint)
        .join(ApiSpec, ApiEndpoint.file_id == ApiSpec.id)
        .filter(ApiSpec.user_id == user.id)
        .count()
    )
    total_runs = db.query(TestRun).filter(TestRun.user_id == user.id).count()
    
    total_results = (
        db.query(TestResult)
        .join(TestRun, TestResult.run_id == TestRun.id)
        .filter(TestRun.user_id == user.id)
        .count()
    )
    total_passed = (
        db.query(TestResult)
        .join(TestRun, TestResult.run_id == TestRun.id)
        .filter(TestRun.user_id == user.id, TestResult.result == "pass")
        .count()
    )
    total_failed = (
        db.query(TestResult)
        .join(TestRun, TestResult.run_id == TestRun.id)
        .filter(TestRun.user_id == user.id, TestResult.result == "fail")
        .count()
    )

    success_rate = round((total_passed / total_results) * 100, 1) if total_results > 0 else 0.0

    seven_days_ago = datetime.now(timezone.utc) - timedelta(days=7)
    fourteen_days_ago = datetime.now(timezone.utc) - timedelta(days=14)

    new_apis_last_week = (
        db.query(ApiEndpoint)
        .join(ApiSpec, ApiEndpoint.file_id == ApiSpec.id)
        .filter(ApiSpec.user_id == user.id, ApiEndpoint.created_at >= seven_days_ago)
        .count()
    )

    runs_this_week = db.query(TestRun).filter(
        TestRun.user_id == user.id,
        TestRun.created_at >= seven_days_ago
    ).count()
    
    runs_prev_week = db.query(TestRun).filter(
        TestRun.user_id == user.id,
        TestRun.created_at >= fourteen_days_ago,
        TestRun.created_at < seven_days_ago
    ).count()

    run_trend = 0.0
    if runs_prev_week > 0:
        run_trend = round(((runs_this_week - runs_prev_week) / runs_prev_week) * 100, 1)
    elif runs_this_week > 0:
        run_trend = 100.0

    return {
        "totalApis": total_apis,
        "totalRuns": total_runs,
        "passed": total_passed,
        "failed": total_failed,
        "successRate": success_rate,
        "newApis": new_apis_last_week,
        "runTrend": run_trend,
    }

@router.get("/test-runs")
def get_test_runs(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    runs = (
        db.query(TestRun)
        .filter(TestRun.user_id == user.id)
        .order_by(TestRun.created_at.desc())
        .limit(10)
        .all()
    )
    out = []
    for r in runs:
        out.append({
            "id": r.id,
            "file_id": r.file_id,
            "fileName": r.file.name if r.file else "Unknown Spec",
            "date": r.created_at.strftime("%Y-%m-%d %H:%M") if r.created_at else "",
            "total": r.total,
            "passed": r.passed,
            "failed": r.failed,
            "status": "Failed" if r.failed > 0 else "Success",
        })
    return out

@router.get("/recent-files")
def get_recent_files(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    files = (
        db.query(ApiSpec)
        .filter(ApiSpec.user_id == user.id)
        .order_by(ApiSpec.created_at.desc())
        .limit(10)
        .all()
    )
    results = []
    for f in files:
        results.append({
            "id": f.id,
            "user_id": f.user_id,
            "name": f.name,
            "file_path": f.file_path,
            "type": f.type,
            "base_url": f.base_url,
            "created_at": f.created_at.isoformat() if f.created_at else None,
            "test_runs_count": len(f.test_runs)
        })
    return results

@router.get("/notifications")
def get_notifications(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Pending files belonging to current user that have not been tested yet
    pending_files = (
        db.query(ApiSpec)
        .filter(ApiSpec.user_id == user.id, ~ApiSpec.test_runs.any())
        .order_by(ApiSpec.created_at.desc())
        .all()
    )
    # Runs belonging to current user that had failures
    failed_runs = (
        db.query(TestRun)
        .filter(TestRun.user_id == user.id, TestRun.failed > 0)
        .order_by(TestRun.created_at.desc())
        .limit(5)
        .all()
    )

    items = []
    for pf in pending_files:
        items.append({
            "id": f"pending-{pf.id}",
            "type": "warning",
            "title": "Untested API Specification",
            "description": f"'{pf.name}' has been uploaded and is waiting for test execution.",
            "link": "/dashboard",
            "time": pf.created_at.strftime("%b %d, %H:%M") if pf.created_at else ""
        })

    for fr in failed_runs:
        items.append({
            "id": f"failed-run-{fr.id}",
            "type": "error",
            "title": f"Test Failures Detected: {fr.file.name if fr.file else 'Spec'}",
            "description": f"{fr.failed} of {fr.total} endpoints failed during execution.",
            "link": f"/report/{fr.id}",
            "time": fr.created_at.strftime("%b %d, %H:%M") if fr.created_at else ""
        })

    return {
        "count": len(items),
        "items": items
    }

