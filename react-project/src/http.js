// Export fetchWeatherData function: Fetch weather data from API
export async function fetchWeatherData(cityName) {
  // Transform the city name
  cityName = cityName.toLowerCase();
  // For city names with spaces
  if (cityName.includes(" ")) {
    // replace space with +
    cityName.replace(/ /g, "+");
  }

  // Fetch weather from API
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9c6d668b0cd18fe2e1509f29b3bedd9e&units=metric`
  );
  // Once the data is recieved - parse it
  const resData = await response.json();
  // Possible error response
  if (!response.ok) {
    // Prepare the error object
    let error = "error";
    return error;
  } else {
    // Define the weatherData object that will store all the weather data
    let weatherData = {
      city: resData.name,
      temp: resData.main.temp,
      feelsLike: resData.main.feels_like,
      humidity: resData.main.humidity,
      wind: resData.wind.speed,
      windDirection: resData.wind.deg,
      code: resData.weather[0].id.toString().charAt(0),
      description: resData.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${resData.weather[0].icon}@2x.png`,
      dayNight: resData.weather[0].icon.slice(-1),
      timezone: resData.timezone,
    };
    // Return
    return weatherData;
  }
}

export async function fetchForecastData(cityName) {
  // Transform the city name
  cityName = cityName.toLowerCase();
  // For city names with spaces
  if (cityName.includes(" ")) {
    // replace space with +
    cityName.replace(/ /g, "+");
  }

  // Fetch weather from API
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=9c6d668b0cd18fe2e1509f29b3bedd9e&units=metric`
  );
  // Once the data is recieved - parse it
  const resData = await response.json();
  // Possible error response
  if (!response.ok) {
    // Prepare the error object
    let error = "error";
    return error;
  } else {
    // Define FORECAST_DATA array of forecastData objects
    const FORECAST_DATA = [];
    // For each forecastData element in the fetched data
    for (let i = 0; i < resData.list.length; i++) {
      // Define the forecastData object that will store all the forecast data
      let forecastData = {
        city: resData.list[i].name,
        time: resData.list[i].dt_txt,
        temp: resData.list[i].main.temp,
        tempMax: resData.list[i].main.temp_max,
        tempMin: resData.list[i].main.temp_min,
        feelsLike: resData.list[i].main.feels_like,
        humidity: resData.list[i].main.humidity,
        wind: resData.list[i].wind.speed,
        windDirection: resData.list[i].wind.deg,
        code: resData.list[i].weather[0].id,
        description: resData.list[i].weather[0].main,
        icon: `https://openweathermap.org/img/wn/${resData.list[i].weather[0].icon}@2x.png`,
        timezone: resData.list[i].timezone,
      };
      // Append forecastData object to the FORECAST_DATA array
      FORECAST_DATA.push(forecastData);
    }
    // Return
    return FORECAST_DATA;
  }
}
