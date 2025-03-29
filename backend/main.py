from typing import Union
from fastapi import FastAPI
from datetime import date
from booking import get_booking_data

app = FastAPI()

@app.get("/booking/{court_id}")
def return_booking_data(court_id: int, date: date): # Date is a query parameter
  booking_data = get_booking_data(court_id, date)
  return booking_data # Fast api automatically returns a dictionary as json
