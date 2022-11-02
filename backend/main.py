from fastapi import FastAPI, Depends, status
import models, database, schemas
from sqlalchemy.orm import Session
from typing import List

#add cors middleware
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

database.Base.metadata.create_all(bind=database.engine)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def get_root():
    return {"Hello": "World"}

@app.get("/about", status_code=status.HTTP_200_OK, response_model=List[schemas.Stock])
def get_about(db : Session = Depends(get_db)):
    # query first element whose id is AXISBANK
    data = db.query(models.NSE).filter(models.NSE.id == "AXISBANK").all()
    return data

@app.get("/match/{prefix}", status_code=status.HTTP_200_OK, response_model=List[schemas.StockName])
def get_match(prefix : str, db : Session = Depends(get_db)):
    # query unique ids whose id starts with prefix
    data = db.query(models.NSE.id).filter(models.NSE.id.startswith(prefix)).distinct().all()
    return data

@app.post("/price", response_model=List[schemas.Stock])
def get_between_dates(request : schemas.PriceRequest, db : Session = Depends(get_db)):
    # query all elements whose id is request.id and date is between request.start_date and request.end_date
    data = db.query(models.NSE).filter(models.NSE.id == request.id).filter(models.NSE.date.between(request.start_date, request.end_date)).all()
    return data