import datetime
from typing import Optional
from pydantic import BaseModel, validator

class Stock(BaseModel):
    id : str
    open : float
    high : float
    low : float
    close : float
    last : float
    date : datetime.date

    class Config():
        orm_mode = True

class StockName(BaseModel):
    id : str

    class Config:
        orm_mode = True

class PriceRequest(BaseModel):
    id : str
    start_date : str
    end_date : str