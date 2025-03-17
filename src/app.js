function refreshTemperature(response) {
  let temperatureElements = document.querySelector("#temperature");
  temperatureElements.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  //description
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  //humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";

  //wind
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed + "km/h";
  //time
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);
  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `
  <img 
    src="${response.data.condition.icon_url}" 
    class="weather-app-icon"
  />
`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return day + " " + hours + ":" + minutes + ",";
}

function searchCity(city) {
  //make api call and update the interface
  let apiKey = "6b534oeab5dabbea88bbtf6452c02346";
  let apiURL =
    "https://api.shecodes.io/weather/v1/current?query=" +
    city +
    "&key=" +
    apiKey;
  console.log("Fetching data from:", apiURL);
  axios.get(apiURL).then(refreshTemperature);
}

function handleSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  //the value written in serchInput replaces cityElement
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
//select the whole form
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchForm);

searchCity("Paris");
