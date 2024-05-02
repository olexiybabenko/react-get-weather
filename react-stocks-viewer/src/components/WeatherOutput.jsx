// Import
import { useState } from "react";
import { fetchWeatherData, fetchForecastData } from "../http"; // fetch functions
import { getCurrentTime } from "../timezones"; // array of objects used to calculate time difference based on time zone recieved from fetch
import ForecastElement from "./ForecastElement"; // ForecastElement component
import WeekForecastElement from "./WeekForecastElement"; // WeekForecastElement component
import TabButton from "./TabButton"; // TabButton component

// WeatherOutput component
export default function WeatherOutput() {
  // useState - manage if data is loaded
  const [isFetching, setIsFetching] = useState(false);
  // useState - manage the data you are fetching (weather data)
  const [weatherData, setWeatherData] = useState();
  // useState - manage the data you are fetching (forecast data)
  const [forecastData, setForecastData] = useState();
  // useState - watch potentional errors
  const [fetchError, setFetchError] = useState();

  // useState - watch the selected button
  // Create a destructed array to store the value (1 - the current state; 2 - what to change)
  const [selectedTopic, setSelectedTopic] = useState();
  // Add the handleClick function
  function handleClick(selectedButton) {
    // setSelectedTopic function that is controlled by useState
    setSelectedTopic(selectedButton);
  }

  // useState - watch the text of the search field
  const [searchField, setSearchField] = useState("");
  // handleChange function - watch change of the search term
  function handleChange(event) {
    // useState - watch change of the search term
    setSearchField(event.target.value);
  }

  // handleSubmit function - once the form is submited, it sends the API request
  async function handleSubmit(event) {
    // Prevent reload
    event.preventDefault();
    // use setIsFetching so that useState watches if the data is loaded
    setIsFetching(true);
    // Try catch - necessary for possible errors
    try {
      // Call the fetchWeatherData function
      const weatherData = await fetchWeatherData(searchField);
      // use setWeatherData so that useState watches it
      setWeatherData(weatherData);
      // Call the fetchWeatherData function
      const FORECAST_DATA = await fetchForecastData(searchField);
      setForecastData(FORECAST_DATA);
    } catch (error) {
      // if error was encountered
      // useState function
      setFetchError(error.message || "Failed to fetch user places");
    }
    // use setIsFetching - show that data is not loading
    setIsFetching(false);
  }

  // Results output
  // Waiting for a search
  let weatherDataOutput = (
    <p className="text-center pt-2">Choose the city to check the weather</p>
  );
  // Define forecastDataOutput
  let forecastDataOutput;
  // If the is output data
  if (weatherData && weatherData !== "error") {
    // Get current time from the fetched data
    let currentTime = getCurrentTime(weatherData);
    // Define HTML output
    let currentTimeOutput = (
      <p>
        {currentTime.hours}:
        {currentTime.minutes > 9
          ? currentTime.minutes
          : "0" + currentTime.minutes}
      </p>
    );

    // Conditional background logic
    // Clear Day
    let gradientBackground = "from-sky-100 to-lime-500";
    // Group 2xx: Thunderstorm, Group 3xx: Drizzle, Group 5xx: Rain
    if (
      weatherData.code === "2" ||
      weatherData.code === "3" ||
      weatherData.code === "5"
    ) {
      gradientBackground = "from-sky-700 to-lime-500 text-white";
    }
    // Group 6xx: Snow
    if (weatherData.code === "6") {
      gradientBackground = "from-sky-300 to-stone-100 from-30%";
    }
    // Group 7xx: Atmosphere
    if (weatherData.code === "7") {
      gradientBackground = "from-gray-200 to-lime-600 from-60%";
    }
    // if it is night
    if (weatherData.dayNight === "n") {
      gradientBackground = "from-sky-900 to-gray-900 text-white";
    }

    // weatherDataOutput displayed component
    weatherDataOutput = (
      <div className="pt-2 mx-auto text-sm md:text-base max-w-2xl">
        {/* Results for */}
        <p className="">
          Results for <span className="font-medium">{weatherData.city}</span>{" "}
        </p>
        {/* Weather div */}
        <div
          className={`mt-1 pt-1 pb-4 border rounded px-2 bg-gradient-to-b  from-50% ${gradientBackground}`}
        >
          <h2 className="font-medium text-lg md:text-xl">Weather</h2>
          {currentTimeOutput}
          {/* Columns */}
          <div className="flex justify-between pt-1">
            {/* Left column*/}
            <div>
              {/* Temperature and Icon*/}
              <div className="flex justify-between gap-1">
                {/* Temperature*/}
                <h1 className="text-2xl md:text-3xl">
                  {Math.round(weatherData.temp)}
                  <span>°</span>
                </h1>
                {/* Icon*/}
                <img
                  className="h-8 w-8 md:h-10 md:w-10 align-middle"
                  src={weatherData.icon}
                  alt=""
                />
              </div>
              {/* Feels like*/}
              <p className="font-light text-xs md:text-sm">
                Feels like
                <span> {Math.round(weatherData.feelsLike)}</span>
                <span>°</span>
              </p>
            </div>
            {/* Right column */}
            <div>
              {/* Description */}
              <p className="font-medium">{weatherData.description}</p>
              {/* Humidity */}
              <p className="text-xs md:text-sm font-light">
                Humidity:
                <span> {weatherData.humidity}%</span>
              </p>
              {/* Wind */}
              <p className="text-xs md:text-sm font-light">
                Wind:
                <span> {Math.round(weatherData.wind)}</span>
                <span> km/h</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    // If forecastData has already been loaded
    if (forecastData && forecastData !== "error") {
      // Create a weeklyForecastData array
      let weeklyForecastData = [7, 15, 23, 31, 39].map((i) => forecastData[i]);
      // ForecastData component
      forecastDataOutput = (
        <>
          {/*Buttons of topics - onClick tab-content will be displayed*/}
          <div className="flex flex-nowrap  mx-auto max-w-2xl border-b border-gray-300">
            <TabButton
              text={"Temperature"}
              isSelected={selectedTopic === "temperature"}
              onClick={() => handleClick("temperature")}
            />
            <TabButton
              text={"Wind"}
              isSelected={selectedTopic === "wind"}
              onClick={() => handleClick("wind")}
            />
            <TabButton
              text={"Humidity"}
              isSelected={selectedTopic === "humidity"}
              onClick={() => handleClick("humidity")}
            />
          </div>
          {/* 24h forecast */}
          <div className="flex flex-nowrap justify-between overflow-x-auto gap-2 text-xs md:text-sm max-w-2xl mx-auto pt-1">
            {forecastData.slice(1, 9).map((forecast) => (
              <ForecastElement
                key={forecast.time}
                time={forecast.time}
                icon={forecast.icon}
                temp={forecast.temp}
              />
            ))}
          </div>
          {/* 5-Day forecast */}
          <div className="flex flex-nowrap justify-between overflow-x-auto gap-2 text-xs md:text-sm max-w-2xl mx-auto mt-3">
            {weeklyForecastData.map((forecast) => (
              <WeekForecastElement
                key={forecast.time}
                time={forecast.time}
                icon={forecast.icon}
                temp={forecast.temp}
              />
            ))}
          </div>
        </>
      );
    }
  }
  // If there was an error in fetch data
  if (weatherData === "error") {
    weatherDataOutput = (
      <p className="text-center pt-2">Please enter a valid city name</p>
    );
  }

  // JSX Output
  return (
    <div className="pt-3 px-3">
      {/* Search field */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-nowrap justify-between  border border-black rounded max-w-80 mx-auto"
      >
        {/*Search Input*/}
        <input
          type="text"
          placeholder="Type the city name..."
          value={searchField}
          onChange={handleChange}
          className="p-1 rounded w-full outline-none"
        />
        {/*Search button*/}
        <button type="submit" className="px-4 bg-blue-600 text-white">
          Search
        </button>
      </form>
      {/* Weather data output */}
      {weatherDataOutput}
      {/* Forecast data output */}
      {forecastDataOutput}
    </div>
  );
}
