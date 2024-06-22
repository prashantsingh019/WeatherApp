// API key
const api_key = "9c5d0ab14a89b09845ed53502be4862a";

// elements
let cityInput = document.querySelector("#getCity");
const get_btn = document.querySelector(".btn-get");
const locate_btn = document.querySelector(".btn-locate");
let city_display = document.querySelector(".cityName");
const country = document.querySelector("#country");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".weather-icon");
const weatherCondition = document.querySelector(".weather-condition");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const timeD = document.querySelector(".time");
const dateD = document.querySelector(".date");
const dayD = document.querySelector(".day");

get_btn.addEventListener("click", () => {
  findCoords(cityInput.value);
  cityInput.value = "";
 // const elements = document.querySelectorAll('card');
  elements.forEach(element => element.remove());
});
/****************************/

//find coordinate
function findCoords(cityName) {
  try {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        display(data);
      });
  } catch (error) {
    console.log(`Error while fetching ${error}`);
  }
}

// fetching weather data
async function fetchApi(data) {
  try {
    await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=hourly,minutely&units=metric&appid=${api_key}`
    )
      .then((res) => res.json())
      .then((data) => weatherdisplay(data));
  } catch (error) {
    console.log(`Error while fetching API data:${error}`);
  }
}
// displaying name
function display(data) {
  const country = data[0].country;
  const state = data[0].state;
  var locationE = `${data[0].name},${state},${country}`;
  city_display.innerHTML = locationE;
  fetchApi(data);
}
// displaying weatherData
function weatherdisplay(data) {
  console.log(data);
  data.daily.forEach((element, index) => {
    if (index == 0) {
      return;
    }
    cardCreate(element)
  });
  temp.innerHTML = `${data.current.temp} &deg;C`;
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="weatherIcon">`;
  weatherCondition.innerHTML = data.current.weather[0].description;
  document.querySelector(".value1").innerHTML = `${data.current.pressure} hPa`;
  document.querySelector(".value2").innerHTML = `${data.current.humidity}%`;
  document.querySelector(
    ".value3"
  ).innerHTML = `${data.current.wind_speed} km/h`;
  document.querySelector(
    ".value4"
  ).innerHTML = `${data.current.feels_like}&deg;C`;
  document.querySelector(".time-zone").innerHTML = data.timezone;
}
// time function
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursin12 = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  if (minutes < 10) {
    zero = 0;
  } else {
    zero = "";
  }
  const ampm = hour >= 12 ? "PM" : "AM";
  timeD.innerHTML = `<span class="text-red-600">${hoursin12}</span>:${zero} ${minutes}<span id="am-pm"> ${ampm}</span>`;
  //timeD.innerHTML = hoursin12 + ':' + zero + minutes + ' ' + `<span id="am-pm">${ampm}</span>`
  dateD.innerHTML = date + " " + months[month];
  dayD.innerHTML = days[day];
}, 1000);
// find current location
locate_btn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((success) => {
    reverseFetch(success.coords.latitude, success.coords.longitude);
  });
});

// location using reverse
async function reverseFetch(latitude, longitude) {
  try {
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`
    )
      .then((res) => res.json())
      .then((result) => display(result));
  } catch (error) {
    console.log("something went wrong" + error);
  }
}

// card creation
function cardCreate(element) {
    console.log(element);
  const cardContainer = document.querySelector(".container");
  const card = document.createElement("div");
  card.classList.add(
    "card",
    "border-2",
    "border-gray-300",
    "p-5",
    "rounded-lg",
    "bg-gray-500",
    "m-2"

  );
  const dt = element.dt;
  const timestampInMilliseconds = dt * 1000;
  const time = new Date(timestampInMilliseconds);
  const date = time.getDate();
  const dayno = time.getDay();
  const month = time.getMonth();
  card.innerHTML = `
    <div class="daynday text-lg font-bold">${days[dayno]},${date} ${months[month]}</div>
   <div class="icon"><img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="weatherIcon"></div>
   <div class="temp text-5xl">${element.temp.day}&deg;C</div>
  <div class="windspeed">windspeed: ${element.wind_speed} KM/hr</div>
    `;
  cardContainer.appendChild(card);
   
}

function removeElementsByClass(className) {
   const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => element.remove());
}
get_btn.addEventListener('click', () => {
    removeElementsByClass('card');
});
locate_btn.addEventListener('click', () => {
    removeElementsByClass('card');
});

// default City
findCoords("New Delhi");

