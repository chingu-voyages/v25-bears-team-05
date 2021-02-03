import React from "react";
import NoSearchResult from "../../components/search/sub-components/no-results";
import UserSearchResultCard from "../../components/search/sub-components/search-users";
import { hasSearchResultContent } from "../../services/search/search";
import { ISearchResults } from "../../services/search/search.types";

import "./Search.css";

function Search(searchResults: ISearchResults, classNameInfo?: string) {
  return (
    <div className={"Search-page-visible"}>
     {!hasSearchResultContent(searchResults) && <NoSearchResult />}
     {hasSearchResultContent(searchResults) && 
      searchResults.users?.map((user) => (
        <UserSearchResultCard {...user}/>
      ))
     }
    </div>
  )
}

export default Search;
