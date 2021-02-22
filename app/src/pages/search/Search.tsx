import React, { useEffect, useState } from "react";
import Post from "../../components/post";
import NoSearchResult from "../../components/search/sub-components/no-results";
import SearchThreadComment from "../../components/search/sub-components/search-thread-comments";
import UserSearchResultCard from "../../components/search/sub-components/search-users";
import { processThread } from "../../services/feed/feed";
import { IProcessedThreadFeed } from "../../services/feed/feed.type";
import { doSearch, hasSearchResultContent } from "../../services/search/search";
import {
  ISearchResults,
} from "../../services/search/search.types";
import { IThreadCommentWithParent } from "../../services/search/search.types";
import { getUser } from "../../services/user";

import "./Search.css";

function Search({
  classNameInfo = "",
  triggered,
  query,
  children,
}: {
  classNameInfo?: string;
  triggered: boolean;
  query: string
  children?: JSX.Element[]
}) {
  const [publicThreads, setPublicThreads] = useState<IProcessedThreadFeed[]>(
    []
  );
  const [privateThreads, setPrivateThreads] = useState<IProcessedThreadFeed[]>(
    []
  );
  const [publicThreadComments, setPublicThreadComments] = useState<
    IThreadCommentWithParent[]
  >();
  const [privateThreadComments, setPrivateThreadComments] = useState<
    IThreadCommentWithParent[]
  >();
  const [processedUsers, setProcessedUsers] = useState<any[]>([]);
  const [queryString, setQueryString] = useState<string>("");

  const [searchResultData, setSearchResultData] = useState<ISearchResults>();
  const [displaySearchResults, setDisplaySearchResults] = useState<boolean>(false);

  
  useEffect(() => {
    (async () => {
      setPublicThreadComments([]);
      setPrivateThreadComments([]);
      setProcessedUsers([]);
      // if (!searchResultData) {
      //   return;
      // }
      if (searchResultData?.users && searchResultData?.users.length > 0) {
        const processedUserData = await Promise.all(
          searchResultData!.users.map((user) =>
            getUser({
              userId: user.id,
              onError: (message) => console.log(message),
            })
          )
        );
        setProcessedUsers([...processedUserData]);
        console.log("41 - processed user data", processedUserData);
      }
      if (
        searchResultData?.public_threads &&
        searchResultData?.public_threads.length > 0
      ) {
        const processedThreadData = await Promise.all(
          searchResultData!.public_threads.map((publicThread) =>
            processThread(publicThread)
          )
        );
        setPublicThreads([...publicThreads, ...processedThreadData]);
        setQueryString(searchResultData!.query_string);
      }

      if (
        searchResultData?.private_threads &&
        searchResultData?.private_threads?.length > 0
      ) {
        const processedPrivateThreadData = await Promise.all(
          searchResultData?.private_threads.map((privateThread) =>
            processThread(privateThread)
          )
        );
        setPrivateThreads([...privateThreads, ...processedPrivateThreadData]);
        setQueryString(searchResultData!.query_string);
      }

      if (
        searchResultData?.public_thread_comments &&
        searchResultData?.public_thread_comments.length > 0
      ) {
        setPublicThreadComments([...searchResultData!.public_thread_comments]);
        setQueryString(searchResultData!.query_string);
      }

      if (
        searchResultData?.private_thread_comments &&
        searchResultData?.private_thread_comments.length > 0
      ) {
        setPrivateThreadComments([...searchResultData!.private_thread_comments]);
        setQueryString(searchResultData!.query_string);
      }
    })();
  }, [
    searchResultData?.public_threads,
    searchResultData?.private_threads,
    searchResultData?.public_thread_comments,
    searchResultData?.private_thread_comments,
    searchResultData?.users,
  ]);

  const onSearchSuccess = (data: any) => {
    console.log("114 searchSuccess triggered!", data)
    setDisplaySearchResults(!!data);
    setSearchResultData(data);
  };

  const onSearchError = (data: any) => {
    // Some error occurred
    console.log("Error", data);
  };
  const onSearchSubmit = (queryString: string) => {
    console.log("onSearchSubmit line 122", queryString)
    doSearch({
      queryString: queryString,
      onSuccess: onSearchSuccess,
      onError: onSearchError,
    });
  };

  useEffect(() => {
    if (triggered) {
      onSearchSubmit(query);
    }
  }, [triggered, query, displaySearchResults])

  const searchSection = () => {
    return (
      <div className={`${classNameInfo || ""} Search-page-visible`}>
        {!hasSearchResultContent(searchResultData) && <NoSearchResult />}
        {hasSearchResultContent(searchResultData) &&
          processedUsers.map((user) => (
            <UserSearchResultCard {...user} key={user.id} />
          ))}
        {publicThreads.length > 0 &&
          publicThreads.map((publicThread) => (
            <Post
              {...{
                threadData: publicThread.threadData!,
                queryString: queryString,
                className: "Post__searchResult",
              }}
              showComments={true}
              key={publicThread.threadData?.id}
            />
          ))}
        {privateThreads.length > 0 &&
          privateThreads.map((privateThread) => (
            <Post
              {...{
                threadData: privateThread.threadData!,
                queryString: queryString,
                className: "Post__searchResult",
              }}
              showComments={true}
              key={privateThread.threadData?.id}
            />
          ))}
        {publicThreadComments?.length! > 0 &&
          publicThreadComments?.map((publicThreadComment) => (
            <SearchThreadComment
              queryString={queryString}
              threadCommentData={publicThreadComment}
            />
          ))}
        {privateThreadComments?.length! > 0 &&
          privateThreadComments?.map((privateThreadComment) => (
            <SearchThreadComment
              queryString={queryString}
              threadCommentData={privateThreadComment}
            />
          ))}
      </div>
    );
  }

  
  return (
   <div className="Search-page__search-invisible-main-body">
     {!triggered && children?.map((child) => (
       child
     ))}
     {displaySearchResults && searchSection()}
   </div>
  )
}

export default Search;
