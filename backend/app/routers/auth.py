from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, ForgotPasswordRequest, ProfileUpdate, AuthResponse, UserOut
from app.dependencies.authentication import get_current_user

router = APIRouter(prefix="", tags=["Auth"])

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"email": ["The email has already been taken."]}
        )
    
    user = User(
        name=user_in.name,
        email=user_in.email,
        password=get_password_hash(user_in.password),
        role="user"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return AuthResponse(
        user=UserOut.model_validate(user),
        access_token=token,
        token_type="Bearer"
    )

@router.post("/login", response_model=AuthResponse)
def login(creds: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == creds.email).first()
    if not user or not verify_password(creds.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid login details"
        )

    token = create_access_token(user.id)
    return AuthResponse(
        user=UserOut.model_validate(user),
        access_token=token,
        token_type="Bearer"
    )

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    return {"message": "Password reset link sent to your email"}

@router.get("/user", response_model=UserOut)
def current_user(user: User = Depends(get_current_user)):
    return UserOut.model_validate(user)

@router.post("/logout")
def logout(user: User = Depends(get_current_user)):
    return {"message": "Successfully logged out"}

@router.post("/update-profile")
def update_profile(
    profile_data: ProfileUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user.name = profile_data.name
    if profile_data.avatar is not None:
        user.avatar = profile_data.avatar
    db.commit()
    db.refresh(user)
    return {
        "message": "Profile updated successfully",
        "user": UserOut.model_validate(user)
    }

