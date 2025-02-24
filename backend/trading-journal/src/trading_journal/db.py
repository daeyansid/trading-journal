from sqlmodel import create_engine, SQLModel, Session
from trading_journal import setting
from trading_journal.models import User, TradingPlan, Account, TradingDailyBook, TradeDetails


# engine is one for whole application
connection_string: str = str(setting.DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg")
engine = create_engine(connection_string, connect_args={"sslmode": "require"}, pool_recycle=300, pool_size=10)

def create_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session