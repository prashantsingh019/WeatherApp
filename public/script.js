function apiCall(location) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=440ffce9deac4ee79ea20630241506&q=${location}`
  )
    .then((res) => res.json())
    .then((data) => {
      insertData(data);
     
       }
     )
    .catch((error) => console.log(error));
}
function currentTime(){
   const date = new Date();
   const hours = date.getHours().toString().padStart(2,'0');
   const minutes = date.getMinutes().toString().padStart(2,'0');
   const currentTime = `${hours}:${minutes}`;
   document.querySelector(".time").innerHTML = currentTime;
   console.log(currentTime);
}


function searchCity() {
  let city = document.querySelector("#search").value;
  city.toUpperCase;
  console.log(city);
  let cityName = document.querySelector(".cityName");
  cityName.innerHTML = city;
  apiCall(city);
  currentTime()
 };

function insertData(data){
      document.querySelector(".temp-value").innerHTML = `${data.current.temp_c} &deg; c`,
      document.querySelector(".value01").innerHTML = `${data.current.feelslike_c} &deg; c`
      document.querySelector(".value02").innerHTML = `${data.current.wind_kph} km/h`
      document.querySelector(".value03").innerHTML = `${data.current.humidity} g/kg`
      document.querySelector(".value04").innerHTML = `${data.current.pressure_in} N/m2`
      setIcon(data);
}

function setIcon(data){
   let temp = data.current.temp_c;
   console.log(temp);
}
