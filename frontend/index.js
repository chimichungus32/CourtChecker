const venues = [
  {
    name: "Allan Small Park tennis courts", 
    id: 30
  },
  {
    name: "Canoon Road Recreation Area courts", 
    id: 43
  },
  {
    name: "Gordon Recreation Ground tennis courts", 
    id: 35
  },
  {
    name: "Hamilton Park tennis courts", 
    id: 36
  },
  {
    name: "Kendall Village Green tennis courts", 
    id: 37
  },
  {
    name: "Kent Oval tennis courts", 
    id: 38
  },
  {
    name: "Killara Park tennis courts", 
    id: 48
  },
  {
    name: "Lindfield Community Centre tennis courts", 
    id: 55
  },
  {
    name: "Lindfield Soldiers Memorial Park tennis courts", 
    id: 8
  },
  {
    name: "Loyal Henry Park tennis courts", 
    id: 53
  },
  {
    name: "Morona Avenue Reserve tennis courts", 
    id: 41
  },
  {
    name: "Queen Elizabeth Reserve tennis courts", 
    id: 49
  },
  {
    name: "Regimental Park tennis courts", 
    id: 39
  },
  {
    name: "Richmond Park tennis courts", 
    id: 40
  },
  {
    name: "Robert Pymble Park tennis courts", 
    id: 54
  },
  {
    name: "Roseville Park tennis courts", 
    id: 44
  },
  {
    name: "St Ives Village Green tennis courts", 
    id: 50
  },
  {
    name: "The Glade Reserve tennis courts", 
    id: 12
  },
  {
    name: "Turramurra Memorial Park tennis courts", 
    id: 52
  },
  {
    name: "Warrimoo Oval tennis courts", 
    id: 51
  }
]

const searchBar = document.getElementById("searchBar")
const width = searchBar.offsetWidth;
console.log(width)

searchBar.addEventListener("input", () => {
  const venueOptions = document.getElementById("venueOptions")
  const input = searchBar.value
  console.log(`The term searched for was ${input}`);
  
  // After input changes remove everything
  while (venueOptions.firstChild) {
    venueOptions.removeChild(venueOptions.firstChild)
  }

  // Append suggestions below the search bar 
  for (let i = 0; i < venues.length; i++) {
    if (venues[i].name.toLowerCase().includes(input.toLowerCase()) && input !== '') {
      const matchedVenueButton = document.createElement("button")
      matchedVenueButton.classList.add('matchedVenuesButton');
      matchedVenueButton.textContent = venues[i].name
      venueOptions.appendChild(matchedVenueButton)
      matchedVenueButton.addEventListener('click', () => {
        searchBar.value = matchedVenueButton.textContent
      })
    }
  }
})

async function fetchBookingData(id, date) {
  // const BACKEND_URL = 'https://court-checker-578539101560.australia-southeast1.run.app'
  const BACKEND_URL = 'http://127.0.0.1:8000'

  try {
    const response = await fetch(`${BACKEND_URL}/booking/${id}?date=${date}`)
    const bookings = await response.json() // response.json() parses json response into a javascript array of objects
    return bookings
  } 
  catch (error) {
    throw error
  }
}

async function displayBookingData(id, date) {
  try {
    const bookings = await fetchBookingData(id, date)
    if (bookings.length === 0) {
      throw new Error("No bookings found")
    }
    
    const courtNameContainer = document.getElementById("courtNameContainer")
    const startTimeContainer = document.getElementById("startTimeContainer")
    const endTimeContainer = document.getElementById("endTimeContainer")

    for (let i = 0; i < bookings.length; i++) {
      // Extract the time 
      const court =  bookings[i].Name
      const startTime = bookings[i].Start_Date.slice(11, 20) 
      const endTime =  bookings[i].End_Date.slice(11, 20)

      const courtNameElement = document.createElement("div")
      courtNameElement.textContent = `Court: ${court}`
      courtNameElement.classList.add('courtName')

      const startTimeElement = document.createElement("div")
      startTimeElement.textContent = `Start: ${startTime}`
      startTimeElement.classList.add('startTime')

      const endTimeElement = document.createElement("div")
      endTimeElement.textContent = `End: ${endTime}`
      endTimeElement.classList.add('endTime')

      courtNameContainer.appendChild(courtNameElement)
      startTimeContainer.appendChild(startTimeElement)
      endTimeContainer.appendChild(endTimeElement)
    }
  }
  catch (error) {
    throw error
  }
}

const submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", async () => {
  submitButton.disabled = true
  try {
    // Remove existing booking data from a previous request
    const courtNameContainer = document.getElementById("courtNameContainer")
    while (courtNameContainer.firstChild) {
      courtNameContainer.removeChild(courtNameContainer.firstChild)
    }
    const startTimeContainer = document.getElementById("startTimeContainer")
    while (startTimeContainer.firstChild) {
      startTimeContainer.removeChild(startTimeContainer.firstChild)
    }
    const endTimeContainer = document.getElementById("endTimeContainer")
    while (endTimeContainer.firstChild) {
      endTimeContainer.removeChild(endTimeContainer.firstChild)
    }

    // Remove venue options from the search bar
    const venueOptions = document.getElementById("venueOptions")
    while (venueOptions.firstChild) {
      venueOptions.removeChild(venueOptions.firstChild)
    }

    const venueName = searchBar.value
    for (let i = 0; i < venues.length; i++) {
      if (venueName === venues[i].name) {
        const date = document.getElementById("dateInput").value
        await displayBookingData(venues[i].id, date) 
      }
    }
  }
  catch (error) {
    console.log("Failed to fetch booking data:", error)
    if (error.message === "No bookings found") {
      const bookingContainer = document.getElementById("bookingContainer")
      const error = document.createElement("div")
      error.textContent = error.message
      bookingContainer.appendChild(error)
    }
  }
  finally {
    submitButton.disabled = false
  }
})


