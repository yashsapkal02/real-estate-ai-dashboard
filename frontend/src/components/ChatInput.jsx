// src/components/ChatInput.jsx
import { useState } from "react";

const locations = [
  "Wakad", "Akurdi", "Baner", "Aundh",
  "Ambegaon Budruk", "Hinjewadi", "Kothrud",
  "Pimple Saudagar"
];

export default function ChatInput({ query, setQuery, onSubmit }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    setSuggestions(
      value
        ? locations.filter((loc) =>
            loc.toLowerCase().startsWith(value.toLowerCase())
          )
        : []
    );
  };

  return (
    <div className="input-section">
      <input
        className="input-box"
        value={query}
        onChange={handleChange}
        placeholder="Example: Compare Wakad and Baner"
      />

      <button className="btn" onClick={onSubmit}>
        Analyze
      </button>

      {suggestions.length > 0 && (
        <div className="suggestion-box">
          {suggestions.map((s, i) => (
            <p
              key={i}
              onClick={() => {
                setQuery(s);
                setSuggestions([]);
              }}
            >
              {s}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
