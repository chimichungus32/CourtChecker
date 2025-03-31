import requests
from datetime import date

def get_booking_data(court_id: int, date: date):
  URL = f'https://krg-prod.bookable.net.au/api/v2/venues/{court_id}/bookingbookablesinperiod?fromDate={date}&toDate={date}&hideCancelledBooking=true&hideClosure=false&hideWorkBooking=false&hideBookableWorkBooking=true&excludeResource=true&hideRequestOrApplication=true&applyOnlyShowConfirmedBooking=true&sort=bufferstart'

  # Response is in json 
  response = requests.get(URL)

  # # Converts json into list of items where each item is a dictionary containing key-value pairs 
  booking_data = response.json()

  cleaned_booking_data = []

  included_names = ["Synthetic grass court 1", "Synthetic grass court 2", "Acrylic hard court 3", "Acrylic Hard Court 4"]

  # booking is dictionary
  # booking data is a list
  for booking in booking_data:
    cleaned_booking = {}
    if booking["Name"] in included_names:
      cleaned_booking["Start_Date"] = booking["Start_Date"]
      cleaned_booking["End_Date"] = booking["End_Date"]
      cleaned_booking["Name"] = booking["Name"]

      if cleaned_booking["Name"] == "Synthetic grass court 1":
        cleaned_booking["Name"] = "Synthetic Grass Court 1"
      elif cleaned_booking["Name"] == "Synthetic grass court 2":
        cleaned_booking["Name"] = "Synthetic Grass Court 2"
      elif cleaned_booking["Name"] == "Acrylic hard court 3":
        cleaned_booking["Name"] = "Acrylic Hard Court 3"

      cleaned_booking_data.append(cleaned_booking)

  sorted_data = sorted(cleaned_booking_data, key=lambda x: (x['Name'], x['Start_Date']))

  return sorted_data