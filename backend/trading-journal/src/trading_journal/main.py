from datetime import timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from typing import Annotated
from trading_journal.auth import EXPIRY_TIME, authenticate_user, create_access_token, create_refresh_token, validate_refresh_token
from trading_journal.db import get_session, create_tables
from trading_journal.models import Token
from trading_journal.router import user, account, trading_plan, tradeDetails, tradingDailyBook
from fastapi.middleware.cors import CORSMiddleware

# Create the FastAPI app first
app = FastAPI(title="Trading Journal", version='1.0.0')

# Initialize tables
create_tables()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Include routers
app.include_router(router=account.account_router)
app.include_router(router=tradeDetails.trading_details_router)
app.include_router(router=tradingDailyBook.trading_daily_book_router)
app.include_router(router=trading_plan.trading_plan_router)
app.include_router(router=user.user_router)

@app.get('/')
async def root():
    return {"message": "Welcome to Trading Journal app"}


# login . username, password
@app.post('/token', response_model=Token)
async def login(form_data:Annotated[OAuth2PasswordRequestForm, Depends()],
                session:Annotated[Session, Depends(get_session)]):
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    expire_time = timedelta(minutes=EXPIRY_TIME)
    access_token = create_access_token({"sub": user.id, "username": form_data.username, "email": user.email}, expire_time)

    refresh_expire_time = timedelta(days=7)
    refresh_token = create_refresh_token({"username":user.email}, refresh_expire_time)

    return Token(access_token=access_token, token_type="bearer", refresh_token=refresh_token)

@app.post("/token/refresh")
def refresh_token(old_refresh_token:str, session:Annotated[Session, Depends(get_session)]):
    
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token, Please login again",
        headers={"www-Authenticate":"Bearer"}
    )
    
    user = validate_refresh_token(old_refresh_token, session)
    if not user:
        raise credential_exception
    
    expire_time = timedelta(minutes=EXPIRY_TIME)
    access_token = create_access_token({"username":user.username}, expire_time)

    refresh_expire_time = timedelta(days=7)
    refresh_token = create_refresh_token({"username":user.email}, refresh_expire_time)

    return Token(access_token=access_token, token_type= "bearer", refresh_token=refresh_token)
