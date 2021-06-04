import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { doSearchAsync } from "../../../../pages/search/searchSlice";
import { IAggregatedLocalSearchResults } from "../../../../services/search/local";
import "./local-search-results.css";
import ResultStrip, { StripType } from "./Result-strip";

function LocalSearchResults({
  results,
  queryString,
  onClick,
}: {
  results: IAggregatedLocalSearchResults;
  queryString: string;
  onClick: () => void;
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const triggerSearch = (typedQuery: string) => {
    history.push(`/search/${encodeURI(typedQuery.trim())}`);
    dispatch(doSearchAsync(typedQuery.trim()));
  };
  return (
    <div className="Local-search-results__main-body" onClick={onClick}>
      {results &&
        results.connections.map((connection, index) => (
          <ResultStrip
            key={index}
            stripType={StripType.Profile}
            data={connection}
            queryString={queryString}
          />
        ))}
      {results &&
        results.threads.map((thread, index) => (
          <ResultStrip
            key={index}
            stripType={StripType.Thread}
            data={thread}
            queryString={queryString}
          />
        ))}
      {results &&
        results.threadComments.length > 0 &&
        results.threadComments.map((threadComment, index) => (
          <ResultStrip
            key={index}
            stripType={StripType.ThreadComment}
            data={threadComment}
            queryString={queryString}
          />
        ))}
      <div className="Go-to-search__main-body">
        <p
          className="Search__link"
          onClick={() => triggerSearch(queryString.trim())}
        >
          Go to search
        </p>
      </div>
    </div>
  );
}

export default LocalSearchResults;
