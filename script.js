//! Fetching rest countries details

const result = fetch("https://restcountries.com/v3.1/all");
result
  .then((coin) => coin.json())
  .then((coin1) => {
    //! Creating a container div

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    const titleElement = document.createElement("h1");
    titleElement.id = "title";
    titleElement.classList.add("text-center");
    titleElement.textContent = "Your Title Here";
    containerDiv.appendChild(titleElement);

    //! Creating a row div - test case 3
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for (var i = 0; i < coin1.length; i++) {
      console.log(coin1[i]);

      //! Creating a column div for each country - test case 3
      const columnDiv = document.createElement("div");
      columnDiv.classList.add(
        "col-sm-6",
        "col-md-4",
        "col-lg-4",
        "col-xl-4",
        "mb-4"
      );

      //! Creating a card div - Test case 5
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "h-100");

      //! Creating a card header div with the country name - test case 6
      const cardHeaderDiv = document.createElement("div");
      cardHeaderDiv.classList.add("card-header");
      cardHeaderDiv.textContent = coin1[i].name.common;

      //! Creating an image element with the country flag - test case 7
      const imgElement = document.createElement("img");
      imgElement.src = coin1[i].flags.png;
      imgElement.classList.add("card-img-top");
      imgElement.alt = "flags";

      //! Creating a card body div - test case 8
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      //! Creating card text elements with country details -test case 9
      const detailsElement = document.createElement("div");
      detailsElement.classList.add("card-text");

      const capitalElement = document.createElement("p");
      capitalElement.textContent = `Capital: ${coin1[i].capital}`;

      const regionElement = document.createElement("p");
      regionElement.textContent = `Region: ${coin1[i].region}`;

      const countryCodeElement = document.createElement("p");
      countryCodeElement.textContent = `Country Code: ${coin1[i].cca3}`;

      detailsElement.appendChild(capitalElement);
      detailsElement.appendChild(regionElement);
      detailsElement.appendChild(countryCodeElement);
      //!Creating a button for weather data
      const weatherButton = document.createElement("button");
      weatherButton.classList.add("btn", "btn-primary");
      weatherButton.textContent = "Click for weather";
      console.log(coin1[i].name.common);
      weatherButton.addEventListener(
        "click",
        ((countryName) => {
          return () => getWeatherData(countryName);
        })(coin1[i].name.common)
      );

      //! Appending elements to construct the card
      cardHeaderDiv.appendChild(imgElement);
      cardBodyDiv.appendChild(cardHeaderDiv);
      cardBodyDiv.appendChild(detailsElement);
      cardBodyDiv.appendChild(weatherButton);
      cardDiv.appendChild(cardBodyDiv);
      columnDiv.appendChild(cardDiv);

      //! Append the column to the row
      rowDiv.appendChild(columnDiv);
    }

    //! Append the row to the container
    containerDiv.appendChild(rowDiv);

    //! Append the container div to the document body
    document.body.appendChild(containerDiv);
  });

function getWeatherData(restCountryName) {
  //! Using restCountryName fetch request to get weather data.
  var apiKey = "23ee8b598138f8ed04f9af17e18ae459";
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${restCountryName}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      var weatherCountryName = weatherData.name;
      var currentTemperature = weatherData.main.temp;

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
