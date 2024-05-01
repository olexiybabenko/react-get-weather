// SearchField component
export default function SearchField(searchField, handleChange, handleSubmit) {
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
    </div>
  );
}
