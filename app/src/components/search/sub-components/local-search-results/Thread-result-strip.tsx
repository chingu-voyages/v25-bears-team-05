import React from "react";
import { IThreadsSearchMatch } from "../../../../services/search/local";
import MiniProfileIcon from "../../../../images/miniprofile.svg";
import ThreadIcon from "../../../../images/comment-icon.svg";
import { getStringExcerpt } from "../../search.helpers";
function ThreadResultStrip({
  data,
  classNameInfo,
  queryString,
  threadPosterAvatar,
}: {
  data: IThreadsSearchMatch;
  classNameInfo?: string;
  queryString: string;
  threadPosterAvatar: string;
}) {
  return (
    <div
      className={`ResultStrip__Main-body Thread-strip ${
        classNameInfo ? classNameInfo : ""
      }`}
    >
      <div className="encircling-oval small">
        <img
          src={threadPosterAvatar || MiniProfileIcon}
          alt="thread-poster-avatar"
        />
      </div>
      <img className="comment-icon" src={ThreadIcon} alt="thread" />
      <div className="ResultStrip__ThreadInfo-section">
        <p className="ThreadInfo-text">{`${getStringExcerpt({
          queryString: queryString,
          threadContent: (data as IThreadsSearchMatch).content.html,
        })}`}</p>
      </div>
    </div>
  );
}

export default ThreadResultStrip;
