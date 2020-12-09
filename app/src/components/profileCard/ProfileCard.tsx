import React from "react";
import IProfileCard from "./profileCard.type";
import convertDateStringToTimeAgo from "../../utils/convertDateStringToTimeAgo";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import Avatar from "../avatar";

function ProfileCard({
  profileInfo,
  connectionInfo,
  threadInfo,
  className,
}: IProfileCard) {
  let name = "...";
  let title = "...";
  let info: string | React.RefAttributes<HTMLAnchorElement> = "...";
  let avatarUrl = null;
  if (profileInfo) {
    const { firstName, lastName, jobTitle, nOfConnections } = profileInfo;
    name = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim();
    title = jobTitle;
    info = (
      <Link to="network">{`${
        Number.isInteger(nOfConnections) ? nOfConnections : "..."
      } Connections`}</Link>
    );
  } else if (connectionInfo) {
    const {
      firstName,
      lastName,
      jobTitle,
      dateTimeConnected,
      avatar,
    } = connectionInfo;
    name = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim();
    title = jobTitle;
    info = convertDateStringToTimeAgo({
      date: dateTimeConnected,
    });
    avatarUrl = avatar?.[0]?.url;
  } else if (threadInfo) {
    const {
      firstName,
      lastName,
      jobTitle,
      dateTimePosted,
      visibility,
      avatar,
    } = threadInfo;
    name = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim();
    title = jobTitle;
    info = `${convertDateStringToTimeAgo({
      date: dateTimePosted,
    })} &bull; ${visibility === 0 ? "anyone" : "connections"}`;
    avatarUrl = avatar?.[0]?.url;
  }

  return (
    <div
      className={`Profile-card ${className ? className : ""} Profile-card--${
        profileInfo ? "profile" : connectionInfo ? "connection" : "thread"
      }`}
    >
      {!profileInfo && (
        <Avatar
          className="Profile-card__avatar"
          url={avatarUrl || ""}
          userName={`${title}`.trim() || "user avatar"}
          size="small"
        />
      )}
      <h1 className="Profile-card__name">{name || "... ..."}</h1>
      <h2 className="Profile-card__title">{title || "..."}</h2>
      <p className="Profile-card__info">{info || "..."}</p>
    </div>
  );
}

export default ProfileCard;
