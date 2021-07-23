import React from "react";
import { IThreadsSearchMatch } from "../../../../services/search/local";
import MiniProfileIcon from "../../../../images/miniprofile.svg";
import ThreadIcon from "../../../../images/comment-icon.svg";
import { getStringExcerpt } from "../../search.helpers";
import { Link } from "react-router-dom";
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
        <Link className="Local-Search__thread-link" to={`/thread/${data.id}`}>
          <p className="ThreadInfo-text">
            {`${getStringExcerpt({
              queryString: queryString,
              threadContent: data.content.html,
            })}`}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ThreadResultStrip;
