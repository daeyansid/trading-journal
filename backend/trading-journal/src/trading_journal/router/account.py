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
        broker=account.broker,
        initial_account_balance=account.initial_account_balance,
        current_account_balance=account.current_account_balance,
        user_id=current_user.id
    )

    session.add(db_account)
    session.commit()
    session.refresh(db_account)
    return db_account


@account_router.get('/get')
async def get_account(
    current_user: Annotated[User, Depends(current_user)],
    session: Session = Depends(get_session)
):
    account = session.query(Account).filter(Account.user_id == current_user.id).all()
    return account

@account_router.get('/get/{account_id}')
async def get_account_by_id(
    account_id: int,
    current_user: Annotated[User, Depends(current_user)],
    session: Session = Depends(get_session)
):
    account = session.query(Account).filter(Account.id == account_id).first()
    if account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return account

@account_router.put('/update/{account_id}')
async def update_account(
    account_id: int,
    account: AccountCreate,
    current_user: Annotated[User, Depends(current_user)],
    session: Session = Depends(get_session)
):
    db_account = session.query(Account).filter(Account.id == account_id).first()
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    db_account.account_name = account.account_name
    db_account.purpose = account.purpose
    db_account.broker = account.broker
    db_account.initial_account_balance = account.initial_account_balance
    db_account.current_account_balance = account.current_account_balance
    session.add(db_account)
    session.commit()
    session.refresh(db_account)
    return db_account
