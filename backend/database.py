from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATA_BASE_NAME = "NSE.db"

TABLE_NAME = "NSE"

SQLALCHEMY_DATABASE_URL = f"sqlite:///../{DATA_BASE_NAME}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
