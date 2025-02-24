from passlib.context import CryptContext
from sqlmodel import Session, select
from typing import Annotated
from trading_journal.db import get_session
from fastapi import Depends, HTTPException, status
from trading_journal.models import RefreshTokenData, TokenData, User
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import datetime, timezone, timedelta

# 265 bits of Secret key
SECRET_KEY = '812c7164cd00095c9e940471a5144d1b91b4532b0f84fe3a8d5ee495713356721aba30b30f66ce9d09956dbfe67d354f43349c5526ccecd380e9a68e5727a92c76b5fbf64519a0d53245cd8b951cb12b5c249fb5db47f9be5c0e3d7b2d81b0754b8f7bd8c4647b61c9b9da4a93df8aec76d5d15da2ad0943e41ac08388c69973eaf7778d5c3d5c331c87db87ba729d423b3c9025fff2d34b9141677b432f64eff3e19b9d393984e71fa7cac2897565697495ed46392cd73b131058364eae2779528a6cee285dfe974eb065af1beaceabf56d24752f446a0106248b4dbd69f677ee5816ffdefc2adc68a5720c1a1ea216be61674d51b49141190fa02b008a2c79'
ALGORITHYM = 'HS256'
EXPIRY_TIME = 1

oauth_scheme = OAuth2PasswordBearer(tokenUrl="/token")

pwd_context = CryptContext(schemes="bcrypt")


def hash_password(password):
    return pwd_context.hash(password)


def verify_password(password, hash_password):
    return pwd_context.verify(password, hash_password)


def get_user_from_db(session: Annotated[Session, Depends(get_session)],
    username: str | None = None,
    email: str | None = None):
    statement = select(User).where(User.username == username)
    user = session.exec(statement).first()
    print(user)
    if not user:
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()
        if user:
            return user

    return user


def authenticate_user(username, password, session: Annotated[Session, Depends(get_session)]):
    db_user = get_user_from_db(session=session, username=username)
    print(f""" authenticate {db_user} """)
    if not db_user:
        return False
    if not verify_password(password, db_user.password):
        return False
    return db_user


def create_access_token(data: dict, expiry_time: timedelta | None):
    data_to_encode = data.copy()
    if expiry_time:
        expire = datetime.now(timezone.utc) + expiry_time
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    data_to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        data_to_encode, SECRET_KEY, algorithm=ALGORITHYM, )
    return encoded_jwt


def current_user(token: Annotated[str, Depends(oauth_scheme)], session: Annotated[Session, Depends(get_session)]):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token, Please login again",
        headers={"www-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHYM)
        username: str | None = payload.get("username")
        if username is None:
            raise credential_exception
        token_data = TokenData(username=username)
        user = get_user_from_db(session, username=token_data.username)
        if not user:
            raise credential_exception
        return user
    except JWTError:
        raise credential_exception


def create_refresh_token(data: dict, expiry_time: timedelta | None):
    data_to_encode = data.copy()
    if expiry_time:
        expire = datetime.now(timezone.utc) + expiry_time
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    data_to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        data_to_encode, SECRET_KEY, algorithm=ALGORITHYM, )
    return encoded_jwt


def validate_refresh_token(token: str, session: Annotated[Session, Depends(get_session)]):

    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token, Please login again",
        headers={"www-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHYM)
        email: str | None = payload.get("username")
        if email is None:
            raise credential_exception
        token_data = RefreshTokenData(email=email)

    except:
        raise JWTError
    user = get_user_from_db(session, email=token_data.email)
    if not user:
        raise credential_exception
    return user
