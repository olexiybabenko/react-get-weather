// Import
import { useState } from "react";
import { fetchWeatherData, fetchForecastData } from "../http"; // fetch functions
import { TIMEZONES, getCurrentTime } from "../timezones"; // array of objects used to calculate time difference based on time zone recieved from fetch

// WeatherOutput component
export default function WeatherOutput() {
  // useState - manage if data is loaded
  const [isFetching, setIsFetching] = useState(false);
  // useState - manage the data you are fetching (weather data)
  const [weatherData, setWeatherData] = useState();
  // useState - watch potentional errors
  const [fetchError, setFetchError] = useState();
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
  let resultsOutput = (
    <p className="text-center pt-2">Choose the city to check the weather</p>
  );
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

    // Displayed component
    resultsOutput = (
      <div className="pt-2 mx-auto text-sm">
        {/* Results for */}
        <p className="">
          Results for <span className="font-medium">{weatherData.city}</span>{" "}
        </p>
        {/* Weather div */}
        <div
          className={`my-1 pt-1 pb-4 border rounded px-2 bg-gradient-to-b  from-50% ${gradientBackground}`}
        >
          <h2 className="font-medium text-lg">Weather</h2>
          {currentTimeOutput}
          {/* Columns */}
          <div className="flex justify-between pt-1">
            {/* Left column*/}
            <div>
              {/* Temperature and Icon*/}
              <div className="flex justify-between gap-1">
                {/* Temperature*/}
                <h1 className="text-2xl">
                  {Math.round(weatherData.temp)}
                  <span>°</span>
                </h1>
                {/* Icon*/}
                <img
                  className="h-8 w-8 align-middle"
                  src={weatherData.icon}
                  alt=""
                />
              </div>
              {/* Feels like*/}
              <p className="font-light text-xs">
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
              <p className="text-xs font-light">
                Humidity:
                <span> {weatherData.humidity}%</span>
              </p>
              {/* Wind */}
              <p className="text-xs font-light">
                Wind:
                <span> {Math.round(weatherData.wind)}</span>
                <span> km/h</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // If there was an error in fetch data
  if (weatherData === "error") {
    resultsOutput = (
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
      {/* Results output */}
      {resultsOutput}
    </div>
  );
}
