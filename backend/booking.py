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

  # booking is dictionary
  # booking data is a list
  for booking in booking_data:
    cleaned_booking = {}
    if booking["PreventBooking"] is None:
      print(booking["PreventBooking"], booking["Name"].lower())
      cleaned_booking["Start_Date"] = booking["Start_Date"].lower()
      cleaned_booking["End_Date"] = booking["End_Date"].lower()
      cleaned_booking["Name"] = booking["Name"].lower()
      cleaned_booking_data.append(cleaned_booking)
        
  sorted_data = sorted(cleaned_booking_data, key=lambda x: (x['Name'], x['Start_Date']))

  return sorted_data

# import requests
# from datetime import date

# def get_booking_data(court_id: int, date: date):
#   URL = f'https://krg-prod.bookable.net.au/api/v2/venues/{court_id}/bookingbookablesinperiod?fromDate={date}&toDate={date}&hideCancelledBooking=true&hideClosure=false&hideWorkBooking=false&hideBookableWorkBooking=true&excludeResource=true&hideRequestOrApplication=true&applyOnlyShowConfirmedBooking=true&sort=bufferstart'
  
#   # Response is in json 
#   response = requests.get(URL)

#   # # Converts json into list of items where each item is a dictionary containing key-value pairs 
#   booking_data = response.json()
#   print(booking_data)

#   cleaned_booking_data = []

#   # booking is dictionary
#   # booking data is a list
#   for booking in booking_data:
#     cleaned_booking = {}
#     if booking["Given_Names"] != "" and booking["Family_Name"] != "":
#       cleaned_booking["Start_Date"] = booking["Start_Date"].lower()
#       cleaned_booking["End_Date"] = booking["End_Date"].lower()
#       cleaned_booking["Name"] = booking["Name"].lower()
#       cleaned_booking["First_Name"] = booking["Given_Names"]
#       cleaned_booking["Last_Name"] = booking["Family_Name"]
#       cleaned_booking_data.append(cleaned_booking)
        
#   sorted_data = sorted(cleaned_booking_data, key=lambda x: (x['Name'], x['Start_Date']))

#   return sorted_data
