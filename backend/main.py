from fastapi import FastAPI, Depends, status
from models import NSE
from schemas import Stock, StockName, PriceRequest
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/")
def get_root():
    return {"msg": "Hello World"}

# get stock data on specific date
@app.get("/api/stock/{id}/{date}", status_code=status.HTTP_200_OK, response_model=List[Stock])
def get_stock(id : str, date : str, db : Session = Depends(get_db)):
    data = db.query(NSE).filter(NSE.id == id, NSE.date == date).all()
    return data

@app.get("/api/stock/{id}/{start_date}/{end_date}", status_code=status.HTTP_200_OK, response_model=List[Stock])
def get_stock_between_dates(id : str, start_date : str, end_date : str, db : Session = Depends(get_db)):
    # convert string to date
    start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
    end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
    data = db.query(NSE).filter(NSE.id == id).filter(NSE.date.between(start_date, end_date)).order_by(NSE.date).all()
    return data

# api for getting all the unique ids
@app.get("/api/stock/ids", status_code=status.HTTP_200_OK, response_model=List[StockName])
def get_ids(db : Session = Depends(get_db)):
    # query unique ids
    data = db.query(NSE.id).distinct().all()
    return data