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
    const { firstName, lastName, jobTitle, nOfConnections } = profileInfo;
    name = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim();
    title = jobTitle;
    info = (
      <Link to="/network">{`${
        Number.isInteger(nOfConnections) ? nOfConnections : "..."
      } Connections`}</Link>
    );
  } else if (connectionInfo) {
    const { firstName, lastName, jobTitle, dateTimeConnected } = connectionInfo;
    name = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim();
    title = jobTitle;
    info = convertDateStringToTimeAgo({
      date: dateTimeConnected,
    });
  } else if (threadInfo) {
    const {
      firstName,
      lastName,
      jobTitle,
      dateTimePosted,
      visibility,
    } = threadInfo;
    name = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim();
    title = jobTitle;
    info = `${convertDateStringToTimeAgo({
      date: dateTimePosted,
    })} &bull; ${visibility}`;
  }

  return (
    <div className={`Profile-card ${className}`}>
      <h1 className="Profile-card__name">{name || "... ..."}</h1>
      <h2 className="Profile-card__title">{title || "..."}</h2>
      <p className="Profile-card__info">{info || "..."}</p>
    </div>
  );
}

export default ProfileCard;
