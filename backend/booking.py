import requests
from datetime import date

def get_booking_data(court_id: int, date: date):
  URL = f'https://krg-prod.bookable.net.au/api/v2/venues/{court_id}/bookingbookablesinperiod?fromDate={date}&toDate={date}&hideCancelledBooking=true&hideClosure=false&hideWorkBooking=false&hideBookableWorkBooking=true&excludeResource=true&hideRequestOrApplication=true&applyOnlyShowConfirmedBooking=true&sort=bufferstart'
  
  # Response is in json 
  response = requests.get(URL)

  # # Converts json into list of items where each item is a dictionary containing key-value pairs 
  booking_data = response.json()
  # print(booking_data)

  cleaned_booking_data = []

  included_names = ["acrylic hard court", "synthetic grass court"]

  # booking is dictionary
  # booking data is a list
  for booking in booking_data:
    if booking["PreventBooking"]:
      continue  
    cleaned_booking = {}
    for included_name in included_names:
      if included_name in booking["Name"].lower():
        cleaned_booking["Start_Date"] = booking["Start_Date"].lower()
        cleaned_booking["End_Date"] = booking["End_Date"].lower()
        cleaned_booking["Name"] = booking["Name"].lower()
      
        # Add acrylic hard court 20 bookings only if the venue is canoon (id 43)
        if cleaned_booking["Name"] == "acrylic hard court 20":
          if court_id == 43:
            cleaned_booking_data.append(cleaned_booking)
        else:
          cleaned_booking_data.append(cleaned_booking)
        
  sorted_data = sorted(cleaned_booking_data, key=lambda x: (x['Name'], x['Start_Date']))
  # print(sorted_data)

  return sorted_data
