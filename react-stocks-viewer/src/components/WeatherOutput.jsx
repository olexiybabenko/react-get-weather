// Import
import { useEffect, useState } from "react";

// Test function
const address = fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((user) => {
    return user.address;
  });

// Function: Fetch weather data from API
async function fetchWeatherData(cityName) {
  // Fetch weather from API
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9c6d668b0cd18fe2e1509f29b3bedd9e&units=metric`
  );
  // Once the data is recieved - parse it
  const resData = await response.json();
  // Possible error response
  if (!response.ok) {
    return "Failed to fetch data";
  }
  // Define the weatherData object that will store all the weather data
  let weatherData = {
    city: resData.name,
    temp: resData.main.temp,
    feelsLike: resData.main.feels_like,
    humidity: resData.main.humidity,
    wind: resData.wind.speed,
    code: resData.weather[0].id,
    description: resData.weather[0].main,
    icon: resData.weather[0].icon,
    timezone: resData.timezone,
  };
  // Return
  return weatherData;
}

// WeatherOutput component
export default function WeatherOutput() {
  // useState - manage if data is loaded
  const [isFetching, setIsFetching] = useState(false);
  // useState - manage the data you are fetching (weather data)
  const [weatherData, setWeatherData] = useState();
  // useState - watch potentional errors
  const [error, setError] = useState();

  // useEffect function - it is executed only if dependencies are changed. This will be executed only once
  useEffect(() => {
    // Create a new helper async function to use await
    async function fetchData() {
      // use setIsFetching so that useState watches if the data is loaded
      setIsFetching(true);
      // Try catch - necessary for possible errors
      try {
        // Call the fetchWeatherData function
        const weatherData = await fetchWeatherData("poznan");
        // use setWeatherData so that useState watches it
        setWeatherData(weatherData);
      } catch (error) {
        // if error was encountered
        // useState function
        setError({ message: error.message || "Could not fetch data" });
      }
      // use setIsFetching - show that data is not loading
      setIsFetching(false);
    }
    // Execute the fetchData function
    fetchData();
  }, []);

  // Results output
  let resultsOutput = (
    <p className="text-center pt-2">Choose the city to check the weather</p>
  );
  // If the is output data
  if (weatherData) {
    resultsOutput = <p className="text-center pt-2">{weatherData.city}</p>;
  }

  // JSX Output
  return (
    <div className="pt-3 px-2">
      {/* Search field */}
      <div className="flex flex-nowrap justify-between  border border-black rounded max-w-96 mx-auto">
        <input
          type="text"
          placeholder="Type the city..."
          className="p-1 rounded w-full outline-none"
        />
        <button className="px-4 bg-blue-600 text-white">Search</button>
      </div>
      {/* Results output */}
      {resultsOutput}
    </div>
  );
}
