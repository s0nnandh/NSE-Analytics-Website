from sqlalchemy.orm import validates
from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.types import Date
from database import Base

# change string to datetime


# create model for the database
class NSE(Base):
    __tablename__ = "NSE"
    id = Column("SYMBOL", String, primary_key=True, index=True)
    open = Column("OPEN", Float)
    high = Column("HIGH", Float)
    low = Column("LOW", Float)
    close = Column("CLOSE", Float)
    last = Column("LAST", Float)
    prev_close = Column("PREVCLOSE", Float)
    tot_quantity = Column("TOTTRDQTY", Float)
    total_value = Column("TOTTRDVAL", Float)
    date = Column("TIMESTAMP", Date, primary_key=True)
    total_trades = Column("TOTALTRADES", Integer)
    isin = Column("ISIN", String)   
