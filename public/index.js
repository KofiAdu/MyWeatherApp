const weatherDisplay = document.querySelector('#location')
const tempF = document.querySelector('#tempF')
const tempC = document.querySelector('#tempC')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')
const icon = document.querySelector('#icon')
const description = document.querySelector('#description')
let current = new Date()
const date = document.querySelector('#date')

//getting geolocation
// let lat,lon

// console.log(lat, lon)

// function getLocation()
//     {
//       if (navigator.geolocation)
//         { 
//            navigator.geolocation.getCurrentPosition(position=>{
//                let lat = position.coords.latitude
//                let lon = position.coords.longitude
//                console.log(position.coords.latitude)
//                console.log(position.coords.longitude)

//                return `${lat}&${lon}`
//            });
//          }
//      else{alert("Geolocation is not supported by this browser.")}
//     }

//     getLocation()

//Fetch weather data from api with geolocation
// const fetchGeoWeatherData = async (geoLocation) => {
//     const url = `/api?q=${geoLocation}`

//     const res = await fetch(url)
//     const data = aw
// }
// Fetch weather data from API with city name
const fetchWeather = async (city) => {
  const url = `/api?q=${city}`

  const res = await fetch(url)
  const data = await res.json()

//   console.log(data)
  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert('Invalid API Key')
    return
  }

  const displayData = {
    country: data.sys.country,
    city: data.name,
    tempF: kelvinToFahrenheit(data.main.temp),
    tempC: kelvinToCelsius(data.main.temp),
    icon: data.weather[0].icon,
    description: data.weather[0].description,
    date: dateBuilder(current),
   
  }

  addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `${data.city},${data.country}`
  tempF.innerHTML = `${data.tempF}<span>&deg;F</span>`
  tempC.innerHTML = `${data.tempC}<span>&deg;C</span>`
  icon.innerHTML =  `<img src="icons/${data.icon}.png">`
  description.innerHTML = data.description
  date.innerHTML = data.date
  cityInput.value = ''
}
//`http://openweathermap.org/img/w/${d.weather[0].icon}.png`

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
}

// Convert Kelvin to Celsius
const kelvinToCelsius = (temp) => {
  return Math.ceil((temp - 273.15))
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (cityInput.value === '') {
    alert('Please enter a city')
  } else {
    fetchWeather(cityInput.value)
  }
})

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    let hours = d.getHours()
    let minutes = d.getMinutes()

    return `${day} ${date} ${month} ${year}, ${hours}:${minutes}`
}


// Initial fetch
fetchWeather('Kuopio')