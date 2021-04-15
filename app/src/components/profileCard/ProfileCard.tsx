import React, { useEffect, useRef, useState } from "react";
import IProfileCard, { IBasicCardInfo, ICardInfo } from "./profileCard.type";
import convertDateStringToTimeAgo from "../../utils/convert-time-ago";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import Avatar from "../avatar";
import FollowButton from "../followButton";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, getUserAsync } from "../../pages/profile/profileSlice";

function ProfileCard({ type, userId, className, threadData }: IProfileCard) {
  const [name, setName] = useState<string | undefined>("...");
  const [title, setTitle] = useState<string | undefined>("");
  const [info, setInfo] = useState<
    string | React.RefAttributes<HTMLAnchorElement>
  >("...");
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(null);
  const [isMe, setIsMe] = useState(true);
  const [isAConnection, setIsAConnection] = useState(true);

  if (!userId) {
    throw Error("Can't make ProfileCard! no userId provided");
  }
  const userData = useSelector(selectUserById(userId));
  const dispatch = useDispatch();

  useEffect(() => {
    !userData && dispatch(getUserAsync(userId));
  }, [userId]);

  useEffect(() => {
    (async () => {
      if (userData) {
        const { firstName, lastName, jobTitle } = userData as IBasicCardInfo;
        setName(
          `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim()
        );
        setTitle(jobTitle);
        if (type === "profile") {
          const nOfConnections = (userData as ICardInfo).nOfConnections;
          setInfo(
            <Link to="network">
              {Number.isInteger(nOfConnections)
                ? `${nOfConnections} Connections`
                : "..."}
            </Link>
          );
        } else if (type === "connection") {
          const { dateTimeConnected, avatar } = userData as ICardInfo;
          setInfo(
            convertDateStringToTimeAgo({ date: dateTimeConnected || "" })
          );
          setAvatarUrl(avatar?.[0]?.url);
        } else if (type === "thread") {
          const { avatar } = userData as ICardInfo;
          const actionTitle =
            threadData?.content.updatedAt !== threadData?.content.createdAt
              ? "Edited"
              : "Posted";
          setInfo(
            `${actionTitle} ${convertDateStringToTimeAgo({
              date: threadData?.content.updatedAt || "",
            })} • ${
              threadData?.visibility === 0
                ? "anyone"
                : threadData?.visibility
                ? "connections"
                : ""
            }`
          );
          setAvatarUrl(avatar?.[0]?.url);
        } else if (type === "comment") {
          const { avatar } = userData as ICardInfo;
          const actionTitle =
            threadData?.updatedAt !== threadData?.createdAt
              ? "Edited"
              : "Posted";
          setInfo(
            `${actionTitle} ${convertDateStringToTimeAgo({
              date: threadData?.updatedAt || "",
            })}`
          );
          setAvatarUrl(avatar?.[0]?.url);
        } else if (type === "home-page") {
          const { avatar, nOfConnections } = userData as ICardInfo;
          setAvatarUrl(avatar?.[0]?.url);
          setInfo(
            <Link to="network">
              <span>Connections</span>{" "}
              <span className="Profile-card__info__connections-number">
                {nOfConnections || 0}
              </span>
            </Link>
          );
        }
        const currentUserInfo = await getCurrentUserInfo();
        setIsMe(userId === "me" || currentUserInfo.userId === userId);
        setIsAConnection(!!userData?.isAConnection);
      }
    })();
  }, [userData]);

  return (
    <div
      className={`Profile-card ${
        className ? className : ""
      } Profile-card--${type}`}
    >
      {avatarUrl && (
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

      {(type === "thread" || type === "profile") && !isMe && !isAConnection && (
        <FollowButton
          className="Profile-card__follow"
          connectionName={name || ""}
          connectionId={userId as string}
          onFollow={() => {
            setIsAConnection(true);
          }}
        />
      )}
    </div>
  );
}

export default ProfileCard;
