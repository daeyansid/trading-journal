from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from trading_journal.auth import current_user
from trading_journal.db import get_session
from trading_journal.models import User, TradingPlan, TradingPlanCreate

trading_plan_router = APIRouter(
    prefix="/trading-plan",
    tags=["trading-plan"],
    responses={404: {"description": "Trading Plan Not found"}}
)

@trading_plan_router.get("/")
async def read_trading_plan():
    return {"message": "Welcome to Trading Daily Journal / Trading Plan Page"}

@trading_plan_router.post("/create")
@trading_plan_router.post("/create")
async def create_trading_plan(
    trading_plan: Annotated[TradingPlanCreate, Depends()],
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

@trading_plan_router.get('/me')
async def user_profile (current_user:Annotated[User, Depends(current_user)]):
    return current_user