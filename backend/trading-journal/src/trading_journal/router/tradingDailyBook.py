from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from trading_journal.auth import current_user, get_user_from_db, hash_password, oauth_scheme
from trading_journal.db import get_session
from trading_journal.models import Register_User, User, TradingDailyBook

trading_daily_book_router = APIRouter(
    prefix="/trading-daily-book",
    tags=["trading-daily-book"],
    responses={404: {"description": "trading-daily-book Not found"}}
)

@trading_daily_book_router.get("/")
async def read_user():
    return {"message": "Welcome to Trading Daily Journal / trading-daily-book Page"}
