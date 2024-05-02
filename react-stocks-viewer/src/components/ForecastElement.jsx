// ForecastElement component
export default function ForecastElement({ time, icon, temp }) {
  // JSX Output
  return (
    <div className="px-1">
      {/* Time */}
      <p className="font-light text-center">{time.slice(11, 16)}</p>
      {/* Icon */}
      <img className="h-7 md:h-10 w-7 md:w-10 align-middle" src={icon} alt="" />
      {/* Temperature */}
      <p className=" text-center">
        {Math.round(temp)}
        <span>°</span>
      </p>
    </div>
  );
}
