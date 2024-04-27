// Import
import { useState } from "react";
import Header from "./components/Header"; // Header component
import WeatherOutput from "./components/WeatherOutput"; // WeatherOutput component

function App() {
  // JSX Output
  return (
    <>
      {/*Header*/}
      <Header />
      {/*Search field & Weather Output*/}
      <WeatherOutput />
    </>
  );
}

export default App;
