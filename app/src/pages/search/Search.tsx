import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/post";
import NoSearchResult from "../../components/search/sub-components/no-results";
import SearchThreadComment from "../../components/search/sub-components/search-thread-comments";
import UserSearchResultCard from "../../components/search/sub-components/search-users";
import { hasSearchResultContent } from "../../services/search/search";

import "./Search.css";
import { doSearchAsync, selectResultByCurrentQuery } from "./searchSlice";

function Search({
  classNameInfo = "",
  triggered,
  query,
  children,
}: {
  classNameInfo?: string;
  triggered: boolean;
  query: string;
  children?: JSX.Element[];
}) {
  const result = useSelector(selectResultByCurrentQuery);
  const dispatch = useDispatch();

  const onSearchSubmit = (queryString: string) => {
    dispatch(doSearchAsync(queryString));
  };

  useEffect(() => {
    if (triggered) {
      onSearchSubmit(query);
    }
  }, [triggered, query]);

  const searchSection = () => {
    return (
      <div className={`${classNameInfo || ""} Search-page-visible`}>
        {!hasSearchResultContent(result) ? (
          <NoSearchResult />
        ) : (
          <>
            {result.users.length > 0 &&
              result.users.map((user) => (
                <UserSearchResultCard id={user.id} key={user.id} />
              ))}
            {result.privateThreads.length > 0 &&
              result.privateThreads.map((privateThread) => (
                <Post
                  {...{
                    threadId: privateThread.id!,
                    queryString: query,
                    className: "Post__searchResult",
                  }}
                  showComments={true}
                  key={privateThread.id}
                />
              ))}
            {result.privateThreadComments?.length! > 0 &&
              result.privateThreadComments?.map((privateThreadComment) => (
                <SearchThreadComment
                  queryString={query}
                  threadCommentData={privateThreadComment}
                />
              ))}
            {result.publicThreads.length > 0 &&
              result.publicThreads.map((publicThread) => (
                <Post
                  {...{
                    threadId: publicThread.id!,
                    queryString: query,
                    className: "Post__searchResult",
                  }}
                  showComments={true}
                  key={publicThread.id}
                />
              ))}
            {result.publicThreadComments?.length! > 0 &&
              result.publicThreadComments?.map((publicThreadComment) => (
                <SearchThreadComment
                  queryString={query}
                  threadCommentData={publicThreadComment}
                />
              ))}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="Search-page__search-invisible-main-body">
      {!triggered && children?.map((child) => child)}
      {displaySearchResults && searchSection()}
    </div>
  );
}

export default Search;
