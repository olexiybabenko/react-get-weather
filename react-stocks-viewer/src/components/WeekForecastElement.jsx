// ForecastElement component
export default function WeekForecastElement({ time, icon, temp }) {
  // Define the date object to get the day week
  const date = new Date(time);
  // Define an array of day of week names
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Define the currentDayOfWeek  time.slice(5, 10)
  const currentDayOfWeek = daysOfWeek[date.getDay()];

  // JSX Output
  return (
    <div className="p-1 border border-gray-400  rounded">
      {/* Day of week */}
      <p className="font-light text-center">{currentDayOfWeek}</p>
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
    </div>
  );
}
