import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import searchIcon from "../../images/searchicon.svg";
import cancelIconLight from "../../images/canceliconlight.svg";
import {
  doSearchAsync,
  selectLocalResults,
  selectSearchQuery,
  setSearchQuery,
} from "../../pages/search/searchSlice";
import "./Search.css";
import { selectUserConnections } from "../../pages/profile/profileSlice";
import { LocalSearchResults } from "./sub-components/local-search-results";
import { selectThreads } from "../../pages/thread/threadSlice";

function Search({ className }: { className?: string }) {
  const query = useSelector(selectSearchQuery, shallowEqual);
  const dispatch = useDispatch();
  const [cancelQueryVisible, setCancelQueryVisible] = useState<boolean>(
    query.length > 0
  );
  const [localSearchMenuVisible, setLocalSearchMenuVisible] = useState<boolean>(
    false
  );
  const connections = useSelector(selectUserConnections("me"), shallowEqual);
  const threads = useSelector(selectThreads, shallowEqual);
  const localResults = useSelector(selectLocalResults, shallowEqual);

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length > 0) {
      setCancelQueryVisible(true);
      setLocalSearchMenuVisible(true);
    } else {
      setCancelQueryVisible(false);
      setLocalSearchMenuVisible(false);
    }
    dispatch(setSearchQuery({ threads, connections, query: e.target.value }));
  };
  const history = useHistory();

  const triggerSearch = (typedQuery: string) => {
    typedQuery = typedQuery.trim();
    history.push(`/search/${encodeURI(typedQuery)}`);
    dispatch(doSearchAsync(typedQuery));
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    const queryString = (e.target as HTMLInputElement).value.trim();
    if (e.key === "Enter") {
      triggerSearch(queryString);
    }
  };

  const handleClearSearchQuery = () => {
    setCancelQueryVisible(false);
    setLocalSearchMenuVisible(false);
    dispatch(setSearchQuery({ threads, connections, query: "" }));
  };

  const clickedInMenuRef = useRef(false);
  useEffect(() => {
    const handleClose = () => {
      if (!clickedInMenuRef.current) {
        setLocalSearchMenuVisible(false);
      } else {
        clickedInMenuRef.current = false;
        window?.addEventListener("click", handleClose, { once: true });
      }
    };
    if (localSearchMenuVisible) {
      window?.addEventListener("click", handleClose, { once: true });
    }
    return () => {
      window?.removeEventListener("click", handleClose);
    };
  }, [localSearchMenuVisible]);

  const closeLocalSearch = () => {
    setLocalSearchMenuVisible(false);
    clickedInMenuRef.current = true;
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
      {localSearchMenuVisible && (
        <LocalSearchResults
          results={localResults}
          queryString={query}
          onClick={closeLocalSearch}
        />
      )}
    </div>
  );
}

export default Search;
