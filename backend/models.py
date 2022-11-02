from sqlalchemy import Column, Integer, String, DateTime, Float
from .database import Base

# create model for the database
class NSE(Base):
    __tablename__ = "NSE"
    id = Column(String, primary_key=True, index=True)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    last = Column(Float)
    prev_close = Column(Float)
    tot_quantity = Column(Float)
    total_value = Column(Float)
    date = Column(DateTime, primary_key=True)
    total_trades = Column(Integer)
    isin = Column(String)