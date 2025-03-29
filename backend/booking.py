import requests
from datetime import date

def get_booking_data(court_id: int, date: date):
  # TURRAMURRA
  URL = f'https://krg-prod.bookable.net.au/api/v2/venues/{court_id}/bookingbookablesinperiod?fromDate={date}&toDate={date}&hideCancelledBooking=true&hideClosure=false&hideWorkBooking=false&hideBookableWorkBooking=true&excludeResource=true&hideRequestOrApplication=true&applyOnlyShowConfirmedBooking=true&sort=bufferstart'
  # URL = f'https://krg-prod.bookable.net.au/api/v2/venues/52/bookingbookablesinperiod?fromDate={date}&toDate={date}&hideCancelledBooking=true&hideClosure=false&hideWorkBooking=false&hideBookableWorkBooking=true&excludeResource=true&hideRequestOrApplication=true&applyOnlyShowConfirmedBooking=true&sort=bufferstart'
  # KENT OVAL
  # URL = f'https://krg-prod.bookable.net.au/api/v2/venues/38/bookingbookablesinperiod?fromDate={year}-{month:02d}-{day:02d}&toDate={year}-{month:02d}-{day:02d}&hideCancelledBooking=true&hideClosure=false&hideWorkBooking=false&hideBookableWorkBooking=true&excludeResource=true&hideRequestOrApplication=true&applyOnlyShowConfirmedBooking=true&sort=bufferstart'

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
      # cleaned_booking["Given_Names"] = booking["Given_Names"]
      # cleaned_booking["Family_Name"] = booking["Family_Name"]
      # cleaned_booking["BookingTitle"] = booking["BookingTitle"]
      # cleaned_booking["GroupName"] = booking["GroupName"]
      cleaned_booking_data.append(cleaned_booking)

  cleaned_booking_data.sort(key=lambda x: x["Start_Date"])

  # cleaned_booking_data_json = json.dumps(cleaned_booking_data, indent=4)
  return cleaned_booking_data