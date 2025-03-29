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
      matchedVenueButton.textContent = venues[i].name
      venueOptions.appendChild(matchedVenueButton)
      matchedVenueButton.addEventListener('click', () => {
        searchBar.value = matchedVenueButton.textContent
      })
    }
  }
})

async function fetchBookingData(id) {
  try {
    const response = await fetch(`/booking/${id}`)
    const bookings = await response.json()
    console.log(bookings)
    return bookings
  } 
  catch (error) {
    console.error(error.message)
    return error
  }
}

const submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", () => {
  const venueName = searchBar.value
  for (let i = 0; i < venues.length; i++) {
    if (venueName === venues[i].name) {
      const response = fetchBookingData(venues[i].id)
    }
  }
})


