import React, { useState } from "react";
import { IThreadCommentWithParent } from "../../../../services/search/search.types";
import Comment from "../../../../components/comment";
import "./Search-thread-comments.css";
import Post from "../../../post";

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
    expandedParentThreadVisible,
    setExpandedParentThreadVisible,
  ] = useState(false);

  const onDeleteComment = () => {
    // Not implemented for search
  };

  const parentThreadDropDown = (visible: boolean) => {
    if (threadCommentData?.parentThread && visible) {
      return (
        <Post
          {...{
            threadId: threadCommentData.parentThread.id!,
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
