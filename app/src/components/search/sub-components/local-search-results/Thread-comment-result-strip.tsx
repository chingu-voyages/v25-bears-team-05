import React from "react";
import MiniProfileIcon from "../../../../images/miniprofile.svg";
import ThreadCommentIcon from "../../../../images/thread-comment.svg";
import { IThreadsCommentSearchMatch } from "../../../../services/search/local";
import { getStringExcerpt } from "../../search.helpers";
function ThreadCommentResultStrip({
  data,
  classNameInfo,
  queryString,
  threadPosterAvatar,
}: {
  data: IThreadsCommentSearchMatch;
  classNameInfo?: string;
  queryString: string;
  threadPosterAvatar: string;
}) {
  return (
    <div
      className={`ResultStrip__Main-body ThreadComment-strip ${
        classNameInfo ? classNameInfo : ""
      }`}
    >
      <div className="encircling-oval small">
        <img
          src={threadPosterAvatar || MiniProfileIcon}
          alt="thread-poster-avatar"
        />
      </div>
      <img
        className="comment-icon"
        src={ThreadCommentIcon}
        alt="thread comment"
      />
      <div className="ResultStrip__ThreadCommentInfo-section">
        <p className="ThreadCommentInfo-text">{`${getStringExcerpt({
          queryString: queryString,
          threadContent: data.content,
        })}`}</p>
      </div>
    </div>
  );
}

export default ThreadCommentResultStrip;
