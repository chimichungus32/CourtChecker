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

async function fetchBookingData(nameParam, id, date) {
  const BACKEND_URL = 'https://court-checker-578539101560.australia-southeast1.run.app'
  // const BACKEND_URL = 'http://127.0.0.1:8000'

  if (nameParam === "true") {
    try {
      const response = await fetch(`${BACKEND_URL}/booking/names/${id}?date=${date}`)
      const bookings = await response.json() // response.json() parses json response into a javascript array of objects
      return bookings
    } 
    catch (error) {
      throw error
    }
  }
  else {
    try {
      const response = await fetch(`${BACKEND_URL}/booking/${id}?date=${date}`)
      const bookings = await response.json() // response.json() parses json response into a javascript array of objects
      return bookings
    } 
    catch (error) {
      throw error
    }
  }
  
}

async function displayBookingData(id, date) {
  try {
    // Display a loading spinner 
    const bookingContainer = document.getElementById("bookingContainer")
    const loader = document.createElement("div")
    loader.className = "loader"
    bookingContainer.appendChild(loader)

    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
   
    const bookings = await fetchBookingData(nameParam, id, date)
    loader.remove()

    if (bookings.length === 0) {
      throw new Error("No bookings found!")
    }
    
    const courtNameContainer = document.getElementById("courtNameContainer")
    const startTimeContainer = document.getElementById("startTimeContainer")
    const endTimeContainer = document.getElementById("endTimeContainer")

    for (let i = 0; i < bookings.length; i++) {
      console.log(bookings[i])
      // Extract the time 
      const court =  bookings[i].Name

      // t in date string MUST be uppercase to be a valid iso 8601 date string and guarantee cross browser support
      const startTime = new Date(bookings[i].Start_Date.replace("t", "T"))
      const endTime =  new Date(bookings[i].End_Date.replace("t", "T"))
      
      const courtNameElement = document.createElement("div")
      courtNameElement.textContent = `Court: ${court}`
      courtNameElement.classList.add('courtName')
     
      if (nameParam === "true") {
        const bookerNameContainer = document.getElementById("bookerNameContainer")
        const bookersName = bookings[i].First_Name + ' ' + bookings[i].Last_Name // Extract the booker's first and last name
 
        const bookersNameElement = document.createElement("div")
        bookersNameElement.textContent = bookersName
        bookersNameElement.classList.add('bookersName')

        bookerNameContainer.appendChild(bookersNameElement)

        const currentTime = new Date();
        if (endTime <= currentTime) bookersNameElement.classList.add('pastBooking')
      }

      const startTimeElement = document.createElement("div")
      startTimeElement.textContent = `Start: ${startTime.toLocaleTimeString()}`
      startTimeElement.classList.add('startTime')

      const endTimeElement = document.createElement("div")
      endTimeElement.textContent = `End: ${endTime.toLocaleTimeString()}`
      endTimeElement.classList.add('endTime')
      
      const currentTime = new Date();
      if (endTime <= currentTime) {
        courtNameElement.classList.add('pastBooking')
        startTimeElement.classList.add('pastBooking')
        endTimeElement.classList.add('pastBooking')
      }

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
    // Remove no booking message if it exists
    const errorContainer = document.getElementById("errorContainer")
    if (errorContainer) {
      errorContainer.remove()
    }

    // Remove existing booking data from a previous request
    const courtNameContainer = document.getElementById("courtNameContainer")
    while (courtNameContainer.firstChild) {
      courtNameContainer.removeChild(courtNameContainer.firstChild)
    }

    const bookerNameContainer = document.getElementById("bookerNameContainer")
    while(bookerNameContainer.firstChild) {
      bookerNameContainer.removeChild(bookerNameContainer.firstChild)
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
    if (error.message === "No bookings found!") {
      const bookingContainer = document.getElementById("bookingContainer")
      const errorContainer = document.createElement("div")
      errorContainer.textContent = error.message
      errorContainer.id = "errorContainer"
      console.log(errorContainer.id)
      bookingContainer.appendChild(errorContainer)
    }
  }
  finally {
    submitButton.disabled = false
  }
})


