import React from "react";
import { IAggregatedLocalSearchResults } from "../../../../services/search/local";
import "./local-search-results.css";
import ResultStrip, { StripType } from "./Result-strip";

function LocalSearchResults({
  results,
  queryString,
}: {
  results: IAggregatedLocalSearchResults;
  queryString: string;
}) {
  return (
    <div className="Local-search-results__main-body">
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
    </div>
  );
}

export default LocalSearchResults;
