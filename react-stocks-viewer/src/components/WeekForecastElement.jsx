// ForecastElement component
export default function WeekForecastElement({ time, icon, temp }) {
  // JSX Output
  return (
    <div className="p-1 border border-gray-400 rounded">
      {/* Time */}
      <p className="font-light text-center">{time.slice(5, 10)}</p>
      {/* Icon */}
      <img className="h-7 w-7 align-middle mx-auto" src={icon} alt="" />
      {/* Temperature */}
      <p className=" text-center">
        <span>{Math.round(temp)}</span>
        <span>°</span>
      </p>
    </div>
  );
}
