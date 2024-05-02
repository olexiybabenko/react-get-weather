// ForecastElement component
export default function ForecastElement({
  time,
  icon,
  temp,
  selectedTopic,
  wind,
  windDirection,
  humidity,
}) {
  // Conditionally display the output
  // Define output
  let output;
  // Display temperature
  if (selectedTopic === "temperature") {
    output = (
      <>
        {/* Icon */}
        <img
          className="h-7 md:h-10 w-7 md:w-10 align-middle"
          src={icon}
          alt=""
        />
        {/* Temperature */}
        <p className=" text-center">
          {Math.round(temp)}
          <span>°</span>
        </p>
      </>
    );
  } else if (selectedTopic === "wind") {
    // Display wind
    output = (
      <>
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 stroke-gray-500 my-1 mx-auto stroke-1 fill-none`}
          style={{ transform: `rotate(${windDirection}deg)` }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
          />
        </svg>

        {/* Wind */}
        <p className=" text-center">
          {Math.round(wind)}
          <span className="font-light"> km/h</span>
        </p>
      </>
    );
  } else if (selectedTopic === "humidity") {
    // Display humidity
    output = (
      <>
        {/* Humidity */}
        <p className=" text-center py-2">
          {Math.round(humidity)}
          <span>%</span>
        </p>
      </>
    );
  }
  // JSX Output
  return (
    <div className="px-1">
      {/* Time */}
      <p className="font-light text-center">{time.slice(11, 16)}</p>
      {/* Conditionally display the output */}
      {output}
    </div>
  );
}
