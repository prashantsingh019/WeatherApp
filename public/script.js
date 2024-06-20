// main function 
function main(){
     let search = document.querySelector("#search").value;
     
     weatherInfo(search);
}
// default location
weatherInfo("New Delhi");

// cc0c50e64405d2233dd1a807f0e13724

// fetch API using Async / Await

async function weatherInfo(location){
    try{
      let url = await fetch(`http://api.weatherapi.com/v1/current.json?key=440ffce9deac4ee79ea20630241506&q=${location}`);
      let data = await url.json();
      insertData(data);
      console.log(data);
    }catch(error){
       console.log(error);
    }
    
}

// insert data 
function insertData(weatherData){
  const location = weatherData.location.name;
  const country = weatherData.location.country;
  const temperatureCelsius = weatherData.current.temp_c;
  const humidity = weatherData.current.humidity;
  const windSpeedKph = weatherData.current.wind_kph;
  const conditionText = weatherData.current.condition.text;
  const iconSet = weatherData.current.condition.icon;
  // some insertion
  document.querySelector(".cityName").innerHTML = `${location},`;
  document.querySelector(".country").innerHTML = `${country}`;
  document.querySelector(".temp-value").innerHTML = `${temperatureCelsius}`;
  document.querySelector(".country").innerHTML = `${country}`;
  document.querySelector(".country").innerHTML = `${country}`;
  document.querySelector(".icon").innerHTML = `<img src = "https:${iconSet}" class = "w-3 inline-block">`;
  document.querySelector(".condition").innerHTML = conditionText;
}