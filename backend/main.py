from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
from booking import get_booking_data

app = FastAPI()

origins = [
    "http://172.31.96.178:3000",
    "https://court-checker.pages.dev",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# http://127.0.0.1:8000/booking/52?date=2025-04-06 example
@app.get("/booking/{court_id}")
def return_booking_data(court_id: int, date: date): # Date is a query parameter
  booking_data = get_booking_data(court_id, date)
  return booking_data # Fast api automatically returns a dictionary as json
