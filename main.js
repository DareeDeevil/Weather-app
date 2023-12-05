import getMyLocation from "./geolocation.js";

const apiKey = "747884d579e58ce279eaf78b714fc082";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");

const error = document.querySelector(".error");
const myCity = document.querySelector(".search-box i");

async function cheackWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404 || "undefined") {
    error.style.display = "block";
  } // if we get error
  const data = await response.json();
  console.log(data, "data");

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&deg";
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind").innerHTML =
    Math.round(data.wind.speed) + " km/h";

  if (data.weather[0].main == "Clear") {
    weatherIcon.className = "fa-solid fa-sun";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.className = "fa-solid fa-cloud-rain";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.className = "fa-solid fa-cloud";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.className = "fa-solid fa-cloud-drizzle";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.className = "fa-solid fa-snowflake";
  } else if (data.weather[0].main == "Clouds") {
    weatherIcon.className = "fa-solid fa-cloud";
  } // icons for weather

  weather.style.display = "block";
  error.style.display = "none"; // if we search after error
} // function and

searchButton.addEventListener("click", () => {
  cheackWeather(searchInput.value);
  searchInput.value = "";
}); // button start working

searchInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    cheackWeather(searchInput.value);
    searchInput.value = "";
  } 
});
myCity.addEventListener("click", getMyLocation); // turn on function getMyLocation

export default cheackWeather;

// for icons i used https://fontawesome.com/icons
// for weather API https://openweathermap.org/
// for location https://www.geoapify.com/
