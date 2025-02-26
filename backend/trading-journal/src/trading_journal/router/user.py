from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Form
from sqlmodel import Session
from trading_journal.auth import current_user, get_user_from_db, hash_password
from trading_journal.db import get_session
from trading_journal.models import User

user_router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}}
)

@user_router.get("/")
async def read_user():
    return {"message": "Welcome to Trading Daily Journal User Page"}

@user_router.post("/register")
async def register_user(
    session: Annotated[Session, Depends(get_session)],
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):
    db_user = get_user_from_db(session, username, email)
    if db_user:
        raise HTTPException(status_code=400, detail="User with these credentials already exists")
    user = User(username=username,
                email=email,
                password=hash_password(password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"message": f""" User with {user.username} successfully registered """}


@user_router.get('/me')
async def user_profile(current_user: Annotated[User, Depends(current_user)]):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }