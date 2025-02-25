from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from trading_journal.auth import current_user
from trading_journal.db import get_session
from trading_journal.models import User, Account, AccountCreate

account_router = APIRouter(
    prefix="/account",
    tags=["account"],
    responses={404: {"description": "Account Page Not found"}}
)

@account_router.get("/")
async def read_user():
    return {"message": "Welcome to Trading Daily Journal / Account Page"}

@account_router.post("/create")
async def create_account(
    account: AccountCreate,
    current_user: Annotated[User, Depends(current_user)],
    session: Annotated[Session, Depends(get_session)]
):
    db_account = Account(
        account_name=account.account_name,
        purpose=account.purpose,
        initial_account_balance=account.initial_account_balance,
        current_account_balance=account.current_account_balance,
        user_id=current_user.id
    )
    
    session.add(db_account)
    session.commit()
    session.refresh(db_account)
    return db_account
