import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ placeholder = "Search...", caseSensitive = false }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setError("");
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    // Trim spaces and validate input
    const trimmedQuery = query.trim();
    if (trimmedQuery === "") {
      setError("Search query cannot be empty!");
      return;
    }

    // If case sensitivity is off, convert query to lowercase
    const finalQuery = caseSensitive
      ? trimmedQuery
      : trimmedQuery.toLowerCase();

    // Fetch data
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/search/title",
        {
          params: { title: finalQuery }, // Pass the query as a `title` parameter
        }
      );
      setResults(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`search-input ${error ? "input-error" : ""}`}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? (
            "Searching..."
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          )}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {results.length > 0 && (
        <ul className="results-list">
          {results.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
