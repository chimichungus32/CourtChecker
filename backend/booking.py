import requests
from datetime import date

def get_booking_data(court_id: int, date: date):
  URL = f'https://krg-prod.bookable.net.au/api/v2/venues/{court_id}/bookingbookablesinperiod?fromDate={date}&toDate={date}&hideCancelledBooking=true&hideClosure=false&hideWorkBooking=false&hideBookableWorkBooking=true&excludeResource=true&hideRequestOrApplication=true&applyOnlyShowConfirmedBooking=true&sort=bufferstart'
  
  # Response is in json 
  response = requests.get(URL)

  # # Converts json into list of items where each item is a dictionary containing key-value pairs 
  booking_data = response.json()

  cleaned_booking_data = []

  included_names = ["court 1", "court 2", "court 3", "court 4"]
  excluded_names = ["acrylic hard court 20"]

  # booking is dictionary
  # booking data is a list
  for booking in booking_data:
    cleaned_booking = {}
    for included_name in included_names:
      if included_name in booking["Name"].lower():
        cleaned_booking["Start_Date"] = booking["Start_Date"].lower()
        cleaned_booking["End_Date"] = booking["End_Date"].lower()
        cleaned_booking["Name"] = booking["Name"].lower()
         
        if cleaned_booking["Name"] not in excluded_names:
          cleaned_booking_data.append(cleaned_booking)

  sorted_data = sorted(cleaned_booking_data, key=lambda x: (x['Name'], x['Start_Date']))
  print(sorted_data)

  return sorted_data
