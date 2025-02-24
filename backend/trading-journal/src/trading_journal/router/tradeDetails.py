from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from trading_journal.auth import current_user, get_user_from_db, hash_password, oauth_scheme
from trading_journal.db import get_session
from trading_journal.models import Register_User, User, TradingDailyBook

trading_details_router = APIRouter(
    prefix="/trading-details",
    tags=["trading-details"],
    responses={404: {"description": "trading-details Not found"}}
)

@trading_details_router.get("/")
async def read_user():
    return {"message": "Welcome to Trading Daily Journal / trading-details Page"}
