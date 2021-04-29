import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import searchIcon from "../../images/searchicon.svg";
import {
  doSearchAsync,
  selectSearchQuery,
  setSearchQuery,
} from "../../pages/search/searchSlice";
import "./Search.css";

function Search({ className }: { className?: string }) {
  const query = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };
  const history = useHistory();

  const triggerSearch = (query: string) => {
    history.push(`/search/${encodeURI(query)}`);
    dispatch(doSearchAsync(query));
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    const queryString = (e.target as HTMLInputElement).value;
    if (e.key === "Enter") {
      triggerSearch(queryString);
    }
  };

  return (
    <div className={`Search ${className || ""}`}>
      <input
        className="Search__input"
        id="SearchInput"
        type="text"
        value={query}
        onChange={handleSetQuery}
        onKeyPress={handleEnterKeyPress}
        onBlur={handleSetQuery}
      />
      <label className="Search__label" htmlFor="SearchInput">
        <img src={searchIcon} alt="" />
        Search
      </label>
    </div>
  );
}

export default Search;
