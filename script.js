//!Fetching Country Data
const result = fetch("https://restcountries.com/v3.1/all");
result
  .then((coin) => coin.json())
  .then((coin1) => {
    for (var i = 0; i < coin1.length; i++) {
      console.log(coin1[i]);
      //! Inserting HTMl elements dynamically

      const div = document.createElement("div");
      div.innerHTML = `<div class= rcol-lg-4 col-sm-12>
    <div class="col">
    <div class="card-group">
    <div class="card">
    <div class= "card-header">${coin1[i].name.common}</div>
      <img src="${coin1[i].flags.png}" class="card-img-top" alt="flags">
      <div class="card-body">
        <p class="card-text">Capital: ${coin1[i].capital}</p>
        <p class= "card-text">Region: ${coin1[i].region}</p>
        <p class="card-text"> Country Code: ${coin1[i].cca3}</p>
        <button class = "btn btn-primary" onclick="getWeatherData('${coin1[i].name.common}')"> Click for weather </button>
       
      </div>
    </div>
    </div>
    </div>
  </div>`;

      document.body.append(div);
    }
  });
  
//!Weather Data Fetching Function
function getWeatherData(restCountryName) {
  
  const apiKey = "eebfc7ad50c4a39e555028ff4aee7c38";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${restCountryName}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      const weatherCountryName = weatherData.name;
      const currentTemperature = weatherData.main.temp;

      if (weatherCountryName === restCountryName) {
        alert(
          `Current Temperature in ${weatherCountryName}: ${currentTemperature}°C`
        );
      } else {
        alert("Country names do not match.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert`Error fetching weather data.`;
    });
}
