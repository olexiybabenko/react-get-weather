// ForecastElement component
export default function WeekForecastElement({
  time,
  icon,
  temp,
  selectedTopic,
  wind,
  windDirection,
  humidity,
}) {
  // Define the date object to get the day week
  const date = new Date(time);
  // Define an array of day of week names
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Define the currentDayOfWeek  time.slice(5, 10)
  const currentDayOfWeek = daysOfWeek[date.getDay()];

  // Conditionally display the output
  // Define output
  let output;
  // Display temperature
  if (selectedTopic === "temperature") {
    output = (
      <>
        {/* Icon */}
        <img
          className="h-7 md:h-10 w-7 md:w-10 align-middle mx-auto"
          src={icon}
          alt=""
        />
        {/* Temperature */}
        <p className=" text-center">
          <span>{Math.round(temp)}</span>
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
    <div className="p-1 border border-gray-400  rounded">
      {/* Day of week */}
      <p className="font-light text-center">{currentDayOfWeek}</p>
      {/* Conditionally display the output */}
      {output}
    </div>
  );
}
