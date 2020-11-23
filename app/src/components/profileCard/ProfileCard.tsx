import React from "react";
import IProfileCard from "./profileCard.type";
import convertDateStringToTimeAgo from "../../utils/convertDateStringToTimeAgo";
import { Link } from "react-router-dom";
import "./ProfileCard.css";

function ProfileCard({
  profileInfo,
  connectionInfo,
  threadInfo,
  className,
}: IProfileCard) {
  let name = "...";
  let title = "...";
  let info: string | React.RefAttributes<HTMLAnchorElement> = "...";
  if (profileInfo) {
    name = `${profileInfo.firstName} ${profileInfo.lastName}`;
    title = profileInfo.jobTitle;
    info = (
      <Link to="/network">{`${
        Number.isInteger(profileInfo.nOfConnections)
          ? profileInfo.nOfConnections
          : "..."
      } Connections`}</Link>
    );
  } else if (connectionInfo) {
    name = `${connectionInfo.firstName} ${connectionInfo.lastName}`;
    title = connectionInfo.jobTitle;
    info = convertDateStringToTimeAgo({
      date: connectionInfo.dateTimeConnected,
    });
  } else if (threadInfo) {
    name = `${threadInfo.firstName} ${threadInfo.lastName}`;
    title = threadInfo.jobTitle;
    info = `${convertDateStringToTimeAgo({
      date: threadInfo.dateTimePosted,
    })} &bull; ${threadInfo.visibility}`;
  }

  return (
    <div className={`Profile-card ${className}`}>
      <h1 className="Profile-card__name">{name.trim() || "... ..."}</h1>
      <h2 className="Profile-card__title">{title.trim() || "..."}</h2>
      <p className="Profile-card__info">{info || "..."}</p>
    </div>
  );
}

export default ProfileCard;
