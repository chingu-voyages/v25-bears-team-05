import React, { useEffect, useState } from "react";
import IProfileCard from "./profileCard.type";
import convertDateStringToTimeAgo from "../../utils/convertDateStringToTimeAgo";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import Avatar from "../avatar";
import { getUser } from "../../services/user";
import FollowButton from "../followButton";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import { connect } from "react-redux";
import { IUserProcessed } from "../../services/user/user.type";

function ProfileCard({
  type,
  users,
  userId,
  className,
  threadData,
}: IProfileCard) {
  const [info, setInfo] = useState<
    string | React.RefAttributes<HTMLAnchorElement>
  >("...");

  const currentUserId = users?.me?.id;
  const userData = users?.[userId];
  const name = `${userData?.firstName ? userData.firstName : ""} ${
    userData?.lastName ? userData.lastName : ""
  }`.trim();
  const title = userData?.jobTitle || "";
  const isMe = userId === "me" || currentUserId === userId;
  const [isAConnection, setIsAConnection] = useState(userData?.isAConnection);

  useEffect(() => {
    if (!currentUserId) {
      getCurrentUserInfo();
    }
  }, [currentUserId]);

  useEffect(() => {
    userId && !users?.[userId] && getUser({ userId });
  }, [userId]);

  useEffect(() => {
    (async () => {
      if (userData && threadData) {
        const {
          nOfConnections,
          dateTimeConnected,
        } = userData as IUserProcessed;
        const { createdAt, updatedAt, visibility } = threadData;
        if (type === "profile") {
          setInfo(
            <Link to="network">
              {Number.isInteger(nOfConnections)
                ? `${nOfConnections} Connections`
                : "..."}
            </Link>
          );
        } else if (type === "connection") {
          setInfo(
            convertDateStringToTimeAgo({ date: dateTimeConnected || "" })
          );
        } else if (type === "thread") {
          const actionTitle = updatedAt !== createdAt ? "Edited" : "Posted";
          setInfo(
            `${actionTitle} ${convertDateStringToTimeAgo({
              date: updatedAt || "",
            })} • ${
              visibility === 0 ? "anyone" : visibility ? "connections" : ""
            }`
          );
        } else if (type === "comment") {
          const actionTitle = updatedAt !== createdAt ? "Edited" : "Posted";
          setInfo(
            `${actionTitle} ${convertDateStringToTimeAgo({
              date: updatedAt || "",
            })}`
          );
        }
        setIsAConnection(userData?.isAConnection);
      }
    })();
  }, [userData, currentUserId, threadData, type, userId]);

  return (
    <div
      className={`Profile-card ${
        className ? className : ""
      } Profile-card--${type}`}
    >
      {type !== "profile" && (
        <Link className="Profile-card__avatar" to={`/${userId}/profile`}>
          <Avatar
            userId={userId}
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

      {(type === "thread" || type === "profile") && !isMe && !isAConnection && (
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

const mapStateToProps = (state: any) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(ProfileCard);
