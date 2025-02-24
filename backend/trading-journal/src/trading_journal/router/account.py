from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from trading_journal.auth import current_user, get_user_from_db, hash_password, oauth_scheme
from trading_journal.db import get_session
from trading_journal.models import Register_User, User, TradingDailyBook

account_router = APIRouter(
    prefix="/account",
    tags=["account"],
    responses={404: {"description": "Account Not found"}}
)

@account_router.get("/")
async def read_user():
    return {"message": "Welcome to Trading Daily Journal / Account Page"}
