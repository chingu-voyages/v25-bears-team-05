import React, { useEffect, useRef, useState } from "react";
import IProfileCard, { IBasicCardInfo, ICardInfo } from "./profileCard.type";
import convertDateStringToTimeAgo from "../../utils/convertDateStringToTimeAgo";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import Avatar from "../avatar";
import { getUser } from "../../services/user";
import FollowButton from "../followButton";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";

function ProfileCard({
  type,
  data,
  userId,
  className,
  threadData,
}: IProfileCard) {
  const [name, setName] = useState<string | undefined>("...");
  const [title, setTitle] = useState<string | undefined>("");
  const [info, setInfo] = useState<
    string | React.RefAttributes<HTMLAnchorElement>
  >("...");
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(null);
  const [isMe, setIsMe] = useState(true);
  const [isAConnection, setIsAConnection] = useState(true);
  const id = data?.id || userId;

  useEffect(() => {
    (async () => {
      if (!data) {
        try {
          if (userId) {
            const userData = await getUser({
              userId,
              onError: (msg) => {
                throw Error(msg);
              },
            });
            if (!userData) {
              throw Error("Unable to get user info");
            }
            const {
              firstName,
              lastName,
              jobTitle,
              avatar,
              id,
              isAConnection,
            } = userData;
            data = {
              firstName,
              lastName,
              jobTitle,
              avatar,
              id,
              isAConnection: isAConnection || false,
            };
          } else {
            throw Error(
              "Can't make ProfileCard! no profile data or userId provided"
            );
          }
        } catch (e) {
          console.error(e);
        }
      }
      if (data) {
        const { firstName, lastName, jobTitle } = data as IBasicCardInfo;
        setName(
          `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim()
        );
        setTitle(jobTitle);
        if (type === "profile") {
          const nOfConnections = (data as ICardInfo).nOfConnections;
          setInfo(
            <Link to="network">
              {Number.isInteger(nOfConnections)
                ? `${nOfConnections} Connections`
                : "..."}
            </Link>
          );
        } else if (type === "connection") {
          const { dateTimeConnected, avatar } = data as ICardInfo;
          setInfo(
            convertDateStringToTimeAgo({ date: dateTimeConnected || "" })
          );
          setAvatarUrl(avatar?.[0]?.url);
        } else if (type === "thread") {
          const { avatar } = data as ICardInfo;
          const actionTitle =
            threadData?.updatedAt !== threadData?.createdAt
              ? "Edited"
              : "Posted";
          setInfo(
            `${actionTitle} ${convertDateStringToTimeAgo({
              date: threadData?.updatedAt || "",
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
          const { avatar } = data as ICardInfo;
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
        }
        else if (type === "home-page") {
          const { avatar, nOfConnections } = data as ICardInfo;
          setAvatarUrl(avatar?.[0]?.url);
          setInfo(
            <Link to="network">
              <span>Connections</span> <span className="Profile-card__info__connections-number">{nOfConnections || 0}</span>
            </Link>
          );
        }
        const currentUserInfo = await getCurrentUserInfo();
        setIsMe(id === "me" || currentUserInfo.id === id);
        setIsAConnection(!!data?.isAConnection);
      }
    })();
  }, [data]);

  return (
    <div
      className={`Profile-card ${
        className ? className : ""
      } Profile-card--${type}`}
    >
      {avatarUrl && (
        <Link className="Profile-card__avatar" to={`/${id}/profile`}>
          <Avatar
            url={avatarUrl || ""}
            userName={`${title}`.trim() || "user avatar"}
            size={type === "comment" ? "xsmall" : type === "home-page" ? "medium" : "small"}
          />
        </Link>
      )}
      <Link className="Profile-card__name" to={`/${id}/profile`}>
        <h1>{name || "... ..."}</h1>
      </Link>
      <Link className="Profile-card__title" to={`/${id}/profile`}>
        <h2>{title || ""}</h2>
      </Link>
      <p className="Profile-card__info">{info || ""}</p>

      {(type === "thread" || type === "profile") && !isMe && !isAConnection && (
        <FollowButton
          className="Profile-card__follow"
          connectionName={name || ""}
          connectionId={id as string}
          onFollow={() => {
            setIsAConnection(true);
          }}
        />
      )}
    </div>
  );
}

export default ProfileCard;
