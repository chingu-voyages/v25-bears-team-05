import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import searchIcon from "../../images/searchicon.svg";
import cancelIconLight from "../../images/canceliconlight.svg";
import {
  doSearchAsync,
  selectSearchQuery,
  setSearchQuery,
} from "../../pages/search/searchSlice";
import "./Search.css";
import { selectUserConnections } from "../../pages/profile/profileSlice";
import { selectThreads } from "../../pages/home/homeSlice";

function Search({ className }: { className?: string }) {
  const query = useSelector(selectSearchQuery, shallowEqual);
  const dispatch = useDispatch();
  const [cancelQueryVisible, setCancelQueryVisible] = useState<boolean>(false);
  const connections = useSelector(selectUserConnections("me"), shallowEqual);
  const threads = useSelector(selectThreads, shallowEqual);

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setCancelQueryVisible(true);
    } else {
      setCancelQueryVisible(false);
    }
    console.log("28", connections);
    console.log("29", threads);
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

  const handleClearSearchQuery = () => {
    dispatch(setSearchQuery(""));
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
        {cancelQueryVisible && (
          <img
            className="search-cancel-icon"
            src={cancelIconLight}
            alt=""
            onClick={handleClearSearchQuery}
          />
        )}
      </label>
    </div>
  );
}

export default Search;
