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
      code: resData.weather[0].id,
      description: resData.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${resData.weather[0].icon}@2x.png`,
      timezone: resData.timezone,
    };
    // Return
    console.log(weatherData);
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
    // Define the weatherData object that will store all the weather data
    // let weatherData = {
    //   city: resData.name,
    //   temp: resData.main.temp,
    //   feelsLike: resData.main.feels_like,
    //   humidity: resData.main.humidity,
    //   wind: resData.wind.speed,
    //   code: resData.weather[0].id,
    //   description: resData.weather[0].main,
    //   icon: resData.weather[0].icon,
    //   timezone: resData.timezone,
    // };
    // // Return
    // return weatherData;
    // console.log(resData.list[0]);
  }
}
