from datetime import datetime
from typing import Optional
from fastapi import Form
from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated

# user model
class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str
    email: str
    password: str

# trading plan model
class TradingPlan(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    day: str
    account_balance: float = Field(decimal_places=2)
    daily_target: float = Field(decimal_places=2)
    required_lots: float = Field(decimal_places=2)
    rounded_lots: float = Field(decimal_places=2)
    risk_usd: float = Field(decimal_places=2)
    risk_percentage: float = Field(decimal_places=2)
    stop_loss_pips: int
    take_profit_pips: int
    status: str
    reason: str
    user_id: int = Field(foreign_key="user.id")
    date: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)












# accounts model
class Account(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    account_name: str
    purpose: str
    initial_account_balance: float = Field(decimal_places=2)
    current_account_balance: float = Field(decimal_places=2)
    user_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# trading daily book model
class TradingDailyBook(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    account_id: int = Field(foreign_key="account.id")
    starting_balance: float = Field(decimal_places=2)
    ending_balance: float = Field(decimal_places=2)
    change_in_balance: float = Field(decimal_places=2)
    sentiment: str
    withdraw: float = Field(decimal_places=2)
    summary: str
    result: str
    remarks: str
    date: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# trade details model
class TradeDetails(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    trade_record_id: int = Field(foreign_key="tradingdailybook.id")
    trade_number: int
    trade: str
    open_price: float = Field(decimal_places=4)
    close_price: float = Field(decimal_places=4)
    pnl: float = Field(decimal_places=2)
    remarks: str

# auth
class Register_User (BaseModel):
            username: Annotated[
            str,
            Form(),
        ]
            email: Annotated[
            str,
            Form(),
        ]
            password: Annotated[
            str,
            Form(),
        ]

class Token (BaseModel):
        access_token:str
        token_type: str
        refresh_token: str

class TokenData (BaseModel):
        username:str

# class Todo_Create (BaseModel):
#     content: str

# class Todo_Edit (BaseModel):
#     content:str
#     is_completed: bool

class RefreshTokenData (BaseModel):
    email:str
