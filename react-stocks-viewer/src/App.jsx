// Import
import { useState } from "react";
import Header from "./components/Header"; // Header component
import WeatherOutput from "./components/WeatherOutput"; // WeatherOutput component
import TestSearchField from "./components/SearchField";

function App() {
  // JSX Output
  return (
    <>
      {/*Header*/}
      <Header />
      {/*Weather Output*/}
      <WeatherOutput />
    </>
  );
}

export default App;
