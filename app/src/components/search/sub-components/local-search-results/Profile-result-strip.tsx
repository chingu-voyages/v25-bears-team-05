import React from "react";
import { Link } from "react-router-dom";
import { IConnectionsSearchMatch } from "../../../../services/search/local";
import MiniProfileIcon from "../../../../images/miniprofile.svg";

function ProfileResultStrip({
  data,
  classNameInfo,
}: {
  data: IConnectionsSearchMatch;
  classNameInfo?: string;
}) {
  return (
    <div
      className={`ResultStrip__Main-body Profile-strip ${
        classNameInfo ? classNameInfo : ""
      }`}
    >
      <div className="encircling-oval">
        <Link to={`/${data.userId}/profile`} className="link__User-profile">
          {data.avatar && (
            <img
              className="mini-profile-icon"
              src={data.avatar[0].url || MiniProfileIcon}
              alt="mini"
            />
          )}
        </Link>
      </div>
      <div className="ResultStrip__ProfileInfoSection">
        <p className="Profile-first-last-name">
          <Link to={`/${data.userId}/profile`} className="link__User-profile">
            {`${data.firstName || ""} ${data.lastName || ""}`}
          </Link>
        </p>
        <p className="Profile-job-title">
          <Link to={`/${data.userId}/profile`} className="link__User-profile">
            {`${data.jobTitle || "Testing job title"}`}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ProfileResultStrip;
