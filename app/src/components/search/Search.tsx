import React, { useEffect, useState } from "react";
import searchIcon from "../../images/searchicon.svg";
import "./Search.css";
import ISearchProps from "./search.types"

function Search({ className, onSearchSubmit}: ISearchProps) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setError(query ? "Search not yet implemented" : "");
  }, [query]);

  const handleEnterKeyPress = (e:React.KeyboardEvent) => {
    const queryString = (e.target as HTMLInputElement).value
    if (e.key === "Enter" && queryString.trim() !== "" ) {
      onSearchSubmit(queryString)
    }
  }
  return (
    <div className={`Search ${className || ""}`}>
      <input
        className="Search__input"
        id="SearchInput"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => handleEnterKeyPress(e)}
      />
      <label className="Search__label" htmlFor="SearchInput">
        <img src={searchIcon} alt="" />
        Search
      </label>
    </div>
  );
}

export default Search;
