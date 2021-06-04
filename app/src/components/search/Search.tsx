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
import { selectThreads } from "../../pages/home/homeSlice";
import { LocalSearchResults } from "./sub-components/local-search-results";

function Search({ className }: { className?: string }) {
  const query = useSelector(selectSearchQuery, shallowEqual);
  const dispatch = useDispatch();
  const [cancelQueryVisible, setCancelQueryVisible] = useState<boolean>(false);
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
    dispatch(
      setSearchQuery({ threads, connections, query: e.target.value.trim() })
    );
  };
  const history = useHistory();

  const triggerSearch = (typedQuery: string) => {
    history.push(`/search/${encodeURI(typedQuery.trim())}`);
    dispatch(doSearchAsync(typedQuery.trim()));
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
          onClick={() => (clickedInMenuRef.current = true)}
        />
      )}
    </div>
  );
}

export default Search;
