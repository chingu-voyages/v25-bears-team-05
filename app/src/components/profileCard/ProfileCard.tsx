import React, { useEffect } from "react";
import IProfileCard from "./profileCard.type";
import convertDateStringToTimeAgo from "../../utils/convert-time-ago";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import Avatar from "../avatar";
import FollowButton from "../followButton";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getUsersAsync,
  selectUserById,
} from "../../pages/profile/profileSlice";

function ProfileCard({ type, userId, className, threadData }: IProfileCard) {
  if (!userId) {
    throw Error("Can't make ProfileCard! no userId provided");
  }
  const userData = useSelector(selectUserById(userId), shallowEqual);
  const currentUserData = useSelector(selectUserById("me"), shallowEqual);
  const dispatch = useDispatch();
  const connectionData = currentUserData?.connections?.[userId];
  const name = `${userData?.firstName ? userData?.firstName : ""} ${
    userData?.lastName ? userData?.lastName : ""
  }`.trim();
  const title = userData?.jobTitle;
  const nOfConnections = userData?.nOfConnections;
  const avatarUrl = userData?.avatar?.[0]?.url;
  const actionTitle =
    threadData?.content.updatedAt !== threadData?.content.createdAt
      ? "Edited"
      : "Posted";

  let info: any = "...";
  const getConnectionsInCommon = () =>
    userData
      ? Object.keys(userData.connections)
          .map((connectionId) =>
            currentUserData?.connections[connectionId]
              ? currentUserData.connections[connectionId]
              : null
          )
          .filter((notNull) => notNull)
      : [];
  switch (type) {
    case "profile":
      info = (
        <Link to="network">
          {Number.isInteger(nOfConnections)
            ? `${nOfConnections} Connections`
            : "..."}
        </Link>
      );
      break;
    case "connection":
      const dateTimeConnected = connectionData?.dateTimeConnected;
      info = convertDateStringToTimeAgo({ date: dateTimeConnected || "" });
      break;
    case "thread":
      info = `${actionTitle} ${convertDateStringToTimeAgo({
        date: threadData?.content.updatedAt || "",
      })} • ${
        threadData?.visibility === 0
          ? "anyone"
          : threadData?.visibility
          ? "connections"
          : ""
      }`;
      break;
    case "comment":
      info = `${actionTitle} ${convertDateStringToTimeAgo({
        date: threadData?.updatedAt || "",
      })}`;
      break;
    case "home-page":
      info = (
        <Link to="network">
          <span>Connections</span>{" "}
          <span className="Profile-card__info__connections-number">
            {nOfConnections || 0}
          </span>
        </Link>
      );
      break;
    case "search":
      const connectedWith = getConnectionsInCommon();
      info =
        connectedWith.length > 0 ? (
          `Connected with ${connectedWith.map(({ firstName, lastName, id }) => (
            <Link to={`/${id}/profile`}>
              {firstName} {lastName}
            </Link>
          ))}`
        ) : (
          <>
            <span>Connections</span>{" "}
            <span className="Profile-card__info__connections-number">
              {nOfConnections || 0}
            </span>
          </>
        );
      break;
  }

  useEffect(() => {
    !userData && dispatch(getUsersAsync([userId]));
  }, [dispatch, userData]);

  return (
    <div
      className={`Profile-card ${
        className ? className : ""
      } Profile-card--${type}`}
    >
      {type !== "profile" && (
        <Link className="Profile-card__avatar" to={`/${userId}/profile`}>
          <Avatar
            url={avatarUrl || ""}
            userName={`${title}`.trim() || "user avatar"}
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

      {(type === "thread" || type === "profile") && (
        <FollowButton
          className="Profile-card__follow"
          connectionName={name || ""}
          connectionId={userId as string}
        />
      )}
    </div>
  );
}

export default ProfileCard;
