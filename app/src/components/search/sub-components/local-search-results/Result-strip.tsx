import React, { useEffect, useState } from "react";
import "./local-search-results.css";
import MiniProfileIcon from "../../../../images/miniprofile.svg";
import ThreadIcon from "../../../../images/comment-icon.svg";
import ThreadCommentIcon from "../../../../images/thread-comment.svg";
import {
  IConnectionsSearchMatch,
  IThreadsCommentSearchMatch,
  IThreadsSearchMatch,
} from "../../../../services/search/local";
import { getStringExcerpt } from "../../search.helpers";
import { shallowEqual, useSelector } from "react-redux";
import { selectUserById } from "../../../../pages/profile/profileSlice";

export enum StripType {
  Profile = "profile",
  Thread = "thread",
  ThreadComment = "thread_comment",
}

function ResultStrip({
  classNameInfo,
  stripType,
  data,
  queryString,
}: {
  classNameInfo?: string;
  stripType: StripType;
  data:
    | IConnectionsSearchMatch
    | IThreadsSearchMatch
    | IThreadsCommentSearchMatch;
  queryString: string;
}) {
  const [threadPosterAvatar, setThreadPosterAvatar] = useState<string>(
    MiniProfileIcon
  );

  let constId;
  if (stripType === StripType.Thread) {
    constId = (data as IThreadsSearchMatch).postedByUserId;
  } else if (stripType === StripType.ThreadComment) {
    constId = (data as IThreadsCommentSearchMatch).postedByUserId;
  }
  const user = useSelector(
    selectUserById(constId || MiniProfileIcon),
    shallowEqual
  );

  useEffect(() => {
    if (user && user.avatar[0]) {
      setThreadPosterAvatar(user.avatar[0].url || MiniProfileIcon);
    }
  }, [user]);

  switch (stripType) {
    case StripType.Profile:
      return (
        <div
          className={`ResultStrip__Main-body Profile-strip ${
            classNameInfo ? classNameInfo : ""
          }`}
        >
          <div className="encircling-oval">
            {(data as IConnectionsSearchMatch).avatar && (
              <img
                className="mini-profile-icon"
                src={
                  (data as IConnectionsSearchMatch).avatar[0].url ||
                  MiniProfileIcon
                }
                alt="mini"
              />
            )}
          </div>
          <div className="ResultStrip__ProfileInfoSection">
            <p className="Profile-first-last-name">{`${
              (data as IConnectionsSearchMatch).firstName || ""
            } ${(data as IConnectionsSearchMatch).lastName || ""}`}</p>
            <p className="Profile-job-title">{`${
              (data as IConnectionsSearchMatch).jobTitle || "Testing job title"
            }`}</p>
          </div>
        </div>
      );
    case StripType.Thread:
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
    case StripType.ThreadComment:
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
              threadContent: (data as IThreadsCommentSearchMatch).content,
            })}`}</p>
          </div>
        </div>
      );
    default:
      return (
        <div
          className={`ResultStrip__Main-body Profile-strip ${
            classNameInfo ? classNameInfo : ""
          }`}
        >
          <div className="encircling-oval">
            <h4>Some unknown data</h4>
          </div>
          <div className="ResultStrip__name-section"></div>
        </div>
      );
  }
}

export default ResultStrip;
