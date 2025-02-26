from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
from trading_journal.auth import current_user
from trading_journal.db import get_session
from trading_journal.models import User, TradingPlan, TradingPlanCreate
from pydantic import BaseModel

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

trading_plan_router = APIRouter(
    prefix="/trading-plan",
    tags=["trading-plan"],
    responses={404: {"description": "Trading Plan Not found"}}
)

class StatusUpdate(BaseModel):
    status: str

@trading_plan_router.get("/")
async def read_trading_plan():
    return {"message": "Welcome to Trading Daily Journal / Trading Plan Page"}

@trading_plan_router.post("/create")
async def create_trading_plan(
    trading_plan: TradingPlanCreate,  # Remove the Depends() since we're getting JSON data
    current_user: Annotated[User, Depends(current_user)],
    session: Annotated[Session, Depends(get_session)]
):
    new_trading_plan = TradingPlan(
        day=trading_plan.day,
        account_balance=trading_plan.account_balance,
        daily_target=trading_plan.daily_target,
        required_lots=trading_plan.required_lots,
        rounded_lots=trading_plan.rounded_lots,
        risk_usd=trading_plan.risk_usd,
        risk_percentage=trading_plan.risk_percentage,
        stop_loss_pips=trading_plan.stop_loss_pips,
        take_profit_pips=trading_plan.take_profit_pips,
        status=trading_plan.status,
        reason=trading_plan.reason,
        user_id=current_user.id
    )
    
    session.add(new_trading_plan)
    session.commit()
    session.refresh(new_trading_plan)
    
    return {"message": "Trading plan created successfully", "plan": new_trading_plan}

@trading_plan_router.get('/get')
async def get_trading_plan(
    token: Annotated[str, Depends(oauth2_scheme)],  # Add token dependency
    current_user: Annotated[User, Depends(current_user)],
    session: Session = Depends(get_session)
):
    trading_plan = session.query(TradingPlan).filter(TradingPlan.user_id == current_user.id).all()
    return trading_plan

@trading_plan_router.patch('/{plan_id}/status')
async def update_plan_status(
    plan_id: int,
    status_update: StatusUpdate,
    current_user: Annotated[User, Depends(current_user)],
    session: Session = Depends(get_session)
):
    trading_plan = session.query(TradingPlan).filter(
        TradingPlan.id == plan_id,
        TradingPlan.user_id == current_user.id
    ).first()
    
    if not trading_plan:
        raise HTTPException(status_code=404, detail="Trading plan not found")
    
    trading_plan.status = status_update.status
    session.commit()
    session.refresh(trading_plan)
    
    return trading_plan
