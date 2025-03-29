from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
from booking import get_booking_data

app = FastAPI()

origins = [
    "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/booking/{court_id}")
def return_booking_data(court_id: int, date: date): # Date is a query parameter
  booking_data = get_booking_data(court_id, date)
  return booking_data # Fast api automatically returns a dictionary as json
