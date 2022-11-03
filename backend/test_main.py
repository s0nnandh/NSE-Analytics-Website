from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

AXIS_BANK_LENGTH = 11

AXIS_BANK_DATA = {
    "id": "AXISBANK",
    "open": 908,
    "high": 918,
    "low": 902.1,
    "close": 906,
    "last": 906,
    "date": "2022-10-31"
}

UNIQUE_IDS = 1816

def test_read_main():
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}

def test_read_about():
    response = client.get("/api/about/AXISBANK")
    assert response.status_code == 200
    assert response.json()[0] == AXIS_BANK_DATA
    assert len(response.json()) == AXIS_BANK_LENGTH

def test_read_match():
    response = client.get("/api/match/AXIS")
    assert response.status_code == 200
    assert response.json()[0] == {"id": "AXISBANK"}
    assert len(response.json()) == 10

def test_read_price():
    response = client.post("/api/price", json={"id": "AXISBANK", "start_date": "2022-10-31", "end_date": "2022-11-01"})
    assert response.status_code == 200
    assert response.json()[0] == AXIS_BANK_DATA
    assert len(response.json()) == 1

def test_read_ids():
    response = client.get("/api/ids")
    assert response.status_code == 200
    assert len(response.json()) == UNIQUE_IDS