import React, { useEffect, useState } from "react";
import { IThreadCommentWithParent } from "../../../../services/search/search.types";
import { getUser } from "../../../../services/user";
import { IUserProcessed } from "../../../../services/user/user.type";
import Comment from "../../../../components/comment";
import "./Search-thread-comments.css";
import Post from "../../../post";
import { IProcessedThreadFeed } from "../../../../services/feed/feed.type";
import { processThread } from "../../../../services/thread/thread";

function SearchThreadComment({
  className,
  threadCommentData,
  queryString,
}: {
  queryString: string;
  threadCommentData: IThreadCommentWithParent;
  className?: string;
}) {
  const [
    matchedThreadQueryUser,
    setMatchedThreadQueryUser,
  ] = useState<IUserProcessed>();

  const [parentThread, setParentThread] = useState<IProcessedThreadFeed>();
  const [
    expandedParentThreadVisible,
    setExpandedParentThreadVisible,
  ] = useState(false);
  useEffect(() => {
    (async () => {
      await getUser({
        userId: threadCommentData.postedByUserId,
        onSuccess: (data) => {
          setMatchedThreadQueryUser(data);
        },
        onError: (message) => {
          console.log(message);
        },
      });

      const parentThreadComment = await processThread(
        threadCommentData.parentThread!
      );
      setParentThread(parentThreadComment);
    })();
  }, []);

  const onDeleteComment = () => {
    // Not implemented for search
  };

  const parentThreadDropDown = (visible: boolean) => {
    if (parentThread && visible) {
      return (
        <Post
          {...{
            threadData: parentThread?.threadData!,
            queryString: queryString,
          }}
          visibleExpanded={expandedParentThreadVisible}
          className="SearchThreadComment__parent-thread-excerpt"
        />
      );
    }
  };
  return (
    <div className={`${className || ""} SearchThreadComment__main`}>
      <div className="SearchThreadComment__Comment-section">
        <div className="SearchThreadComment__query-string">
          <p>"{queryString}"</p>
        </div>
        <Comment
          commentData={{
            ...threadCommentData,
            _id: threadCommentData.id!,
            updatedAt: threadCommentData.updatedAt.toString(),
            createdAt: threadCommentData.createdAt.toString(),
          }}
          handleDeleteComment={onDeleteComment}
        />
        <div
          className="SearchThreadComment__expand-parent-thread-button"
          onClick={() => setExpandedParentThreadVisible((show) => !show)}
        >
          {expandedParentThreadVisible
            ? "- Hide parent thread"
            : "+ Show parent thread"}
        </div>
        {parentThreadDropDown(expandedParentThreadVisible)}
      </div>
    </div>
  );
}

export default SearchThreadComment;
