import React, { useEffect, useState } from "react";
import IProfileCard from "./profileCard.type";
import convertDateStringToTimeAgo from "../../utils/convertDateStringToTimeAgo";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import Avatar from "../avatar";
import FollowButton from "../followButton";

function ProfileCard({
  type,
  userData,
  className,
  threadData,
  commentData,
  connectionData,
}: IProfileCard) {
  const [info, setInfo] = useState<
    string | React.RefAttributes<HTMLAnchorElement>
  >("...");

  const name = `${userData?.firstName ? userData.firstName : ""} ${
    userData?.lastName ? userData.lastName : ""
  }`.trim();
  const title = userData?.jobTitle || "";
  const isCurrentUser = userData?.isCurrentUser;
  const userId = userData?.id;
  const [isAConnection, setIsAConnection] = useState(userData?.isAConnection);

  useEffect(() => {
    (async () => {
      if (userData) {
        setIsAConnection(userData.isAConnection);
        const { nOfConnections } = userData;
        if (type === "profile") {
          setInfo(
            <Link to="network">
              {Number.isInteger(nOfConnections)
                ? `${nOfConnections} Connection${
                    (nOfConnections as number) > 1 ? "s" : ""
                  }`
                : "..."}
            </Link>
          );
        } else if (type === "home-page") {
          setInfo(
            <Link to="me/network">
              <span>Connection{(nOfConnections as number) > 1 ? "s" : ""}</span>{" "}
              <span className="Profile-card__info__connections-number">
                {nOfConnections || 0}
              </span>
            </Link>
          );
        } else if (type === "connection") {
          const dateTimeConnected = connectionData?.dateTimeConnected;
          setInfo(
            convertDateStringToTimeAgo({ date: dateTimeConnected || "" })
          );
        } else if (type === "thread" && threadData) {
          const { createdAt, updatedAt, visibility } = threadData;
          const actionTitle = updatedAt !== createdAt ? "Edited" : "Posted";
          setInfo(
            `${actionTitle} ${convertDateStringToTimeAgo({
              date: updatedAt || "",
            })} • ${
              visibility === 0 ? "anyone" : visibility ? "connections" : ""
            }`
          );
        } else if (type === "comment" && commentData) {
          const { createdAt, updatedAt } = commentData;
          const actionTitle = updatedAt !== createdAt ? "Edited" : "Posted";
          setInfo(
            `${actionTitle} ${convertDateStringToTimeAgo({
              date: updatedAt || "",
            })}`
          );
        }
      }
    })();
  }, [userData, threadData, type]);

  return (
    <div
      className={`Profile-card ${
        className ? className : ""
      } Profile-card--${type}`}
    >
      {type !== "profile" && (
        <Link className="Profile-card__avatar" to={`/${userId}/profile`}>
          <Avatar
            userData={userData}
            size={
              type === "comment"
                ? "xsmall"
                : type === "home-page"
                ? "medium"
                : "small"
            }
          />
        </Link>
      )}
      <Link className="Profile-card__name" to={`/${userId}/profile`}>
        <h1>{name || "... ..."}</h1>
      </Link>
      <Link className="Profile-card__title" to={`/${userId}/profile`}>
        <h2>{title || ""}</h2>
      </Link>
      <p className="Profile-card__info">{info || ""}</p>

      {(type === "thread" || type === "profile") &&
        !isCurrentUser &&
        !isAConnection && (
          <FollowButton
            className="Profile-card__follow"
            connectionName={name || ""}
            connectionId={userId}
            onFollow={() => {
              setIsAConnection(true);
            }}
          />
        )}
    </div>
  );
}

export default ProfileCard;
