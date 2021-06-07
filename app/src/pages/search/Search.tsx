import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import Page from "../../components/page";
import Post from "../thread/components/post";
import NoSearchResult from "../../components/search/sub-components/no-results";
import SearchThreadComment from "../../components/search/sub-components/search-thread-comments";
import UserSearchResultCard from "../../components/search/sub-components/search-users";
import Status from "../../components/status";
import { hasSearchResultContent } from "../../services/search/search";
import "./Search.css";
import {
  selectSearchQuery,
  selectResultByCurrentQuery,
  selectSearchStatus,
  setSearchQuery,
} from "./searchSlice";

function Search() {
  const history = useHistory();
  const match: any = useRouteMatch("/search/:query");
  const urlQuery = decodeURI(match.params.query);
  const result = useSelector(selectResultByCurrentQuery, shallowEqual);
  const query = useSelector(selectSearchQuery, shallowEqual);
  const status = useSelector(selectSearchStatus, shallowEqual);

  const dispatch = useDispatch();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (query !== urlQuery) {
      if (firstLoad.current) {
        dispatch(setSearchQuery(urlQuery));
      } else {
        history.push(`/search/${encodeURI(query)}`);
      }
    }
  }, [dispatch, history, urlQuery, query]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  const handleNavigateBack = () => {
    history.goBack();
  };

  return (
    <Page className="Search-page">
      <Status status={status} />
      <div className="Search-page-visible">
        <div className="Search__go-back-section">
          <h4 className="Go-back__button" onClick={handleNavigateBack}>
            Go Back
          </h4>
        </div>
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
            {result.privateThreadComments.length > 0 &&
              result.privateThreadComments?.map((privateThreadComment) => (
                <SearchThreadComment
                  queryString={query}
                  threadCommentId={privateThreadComment.id}
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
            {result.publicThreadComments.length > 0 &&
              result.publicThreadComments?.map((publicThreadComment) => (
                <SearchThreadComment
                  queryString={query}
                  threadCommentId={publicThreadComment.id}
                />
              ))}
          </>
        )}
      </div>
    </Page>
  );
}

export default Search;
