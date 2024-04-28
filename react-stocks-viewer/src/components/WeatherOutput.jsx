// Import
import { useState } from "react";
import { fetchWeatherData, fetchForecastData } from "../http";

// Test
fetchForecastData("waRsaw");

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
  let resultsOutput = (
    <p className="text-center pt-2">Choose the city to check the weather</p>
  );
  // If the is output data
  if (weatherData) {
    resultsOutput = <p className="text-center pt-2">{weatherData.city}</p>;
  }
  // If there was an error in fetch data
  if (weatherData === "error") {
    resultsOutput = (
      <p className="text-center pt-2">Please enter a valid city name</p>
    );
  }

  // JSX Output
  return (
    <div className="pt-3 px-2">
      {/* Search field */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-nowrap justify-between  border border-black rounded max-w-96 mx-auto"
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
