function refreshTemperature(response) {
  //check if it works using console

  let temperatureElements = document.querySelector("#temperature");
  temperatureElements.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  //description
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  console.log(response.data);
  //humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  //wind
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed + "km/h";
}

function searchCity(city) {
  //make api call and update the interface
  let apiKey = "6b534oeab5dabbea88bbtf6452c02346";
  let apiURL =
    "https://api.shecodes.io/weather/v1/current?query=" +
    city +
    "&key=" +
    apiKey;
  axios.get(apiURL).then(refreshTemperature);
}

function handleSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  let cityElement = document.querySelector("#city");
  //the value written in serchInput replaces cityElement
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
//select the whole form
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchForm);

searchCity("Paris");
