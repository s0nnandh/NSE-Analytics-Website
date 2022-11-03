from fastapi import FastAPI, Depends, status
from models import NSE
from schemas import Stock, StockName, PriceRequest
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

#add cors middleware
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

@app.get("/api/stock/about/{id}", status_code=status.HTTP_200_OK, response_model=List[Stock])
def get_about(id : str, db : Session = Depends(get_db)):
    # query first element whose id is AXISBANK
    data = db.query(NSE).filter(NSE.id == id).all()
    return data

@app.get("/api/match/{prefix}", status_code=status.HTTP_200_OK, response_model=List[StockName])
def get_match(prefix : str, db : Session = Depends(get_db)):
    # query unique ids whose id starts with prefix
    data = db.query(NSE.id).filter(NSE.id.startswith(prefix)).distinct().all()
    return data

@app.post("/api/price", response_model=List[Stock])
def get_stock_between_dates(request : PriceRequest, db : Session = Depends(get_db)):
    # convert string to date
    print(request.start_date)
    print(request)
    start_date = datetime.strptime(request.start_date, "%Y-%m-%d").date()
    end_date = datetime.strptime(request.end_date, "%Y-%m-%d").date()
    data = db.query(NSE).filter(NSE.id == request.id).filter(NSE.date.between(start_date, end_date)).order_by(NSE.date).all()
    return data

@app.get("/api/stock/{id}/{start_date}/{end_date}", status_code=status.HTTP_200_OK, response_model=List[Stock])
def get_stock(id : str, start_date : str, end_date : str, db : Session = Depends(get_db)):
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