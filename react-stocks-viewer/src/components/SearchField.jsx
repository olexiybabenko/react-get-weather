import { useState, useEffect } from "react";

// SearchField component
export default function TestSearchField() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
      const data = await (
        await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      ).json();
      setData(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <input
        className="album_id"
        required="required"
        placeholder="Enter an ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button type="submit" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}
