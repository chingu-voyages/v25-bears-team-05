import React, { useState } from "react";
import "./local-search-results.css";
import MiniProfileIcon from "../../../../images/miniprofile.svg";
import CommentIcon from "../../../../images/comment-icon.svg";
import {
  ConnectionsSearchMatch,
  ThreadsSearchMatch,
} from "../../../../services/search/local";
import { getStringExcerpt } from "../../search.helpers";

export enum StripType {
  Profile = "profile",
  Thread = "thread",
}

function ResultStrip({
  classNameInfo,
  stripType,
  data,
  queryString,
}: {
  classNameInfo?: string;
  stripType: StripType;
  data: ConnectionsSearchMatch | ThreadsSearchMatch;
  queryString: string;
}) {
  const [threadPosterAvatar, setThreadPosterAvatar] = useState<string>(
    MiniProfileIcon
  );

  switch (stripType) {
    case StripType.Profile:
      return (
        <div
          className={`ResultStrip__Main-body Profile-strip ${
            classNameInfo ? classNameInfo : ""
          }`}
        >
          <div className="encircling-oval">
            {(data as ConnectionsSearchMatch).avatar && (
              <img
                className="mini-profile-icon"
                src={
                  (data as ConnectionsSearchMatch).avatar[0].url ||
                  MiniProfileIcon
                }
                alt="mini"
              />
            )}
          </div>
          <div className="ResultStrip__ProfileInfoSection">
            <p className="Profile-first-last-name">{`${
              (data as ConnectionsSearchMatch).firstName || ""
            } ${(data as ConnectionsSearchMatch).lastName || ""}`}</p>
            <p className="Profile-job-title">{`${
              (data as ConnectionsSearchMatch).jobTitle || "Testing job title"
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
          <img className="comment-icon" src={CommentIcon} alt="mini" />
          <div className="ResultStrip__ThreadInfo-section">
            <p className="ThreadInfo-text">{`${getStringExcerpt({
              queryString: queryString,
              threadContent: (data as ThreadsSearchMatch).content.html,
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
