import React, { useEffect, useState } from "react";
import "./Avatar.css";
import defaultAvatar from "../../images/defaultavatar0.svg";
import { AvatarProps } from "./Avatar.type";
import { connect } from "react-redux";
import { getUser } from "../../services/user";

function Avatar({ users, userId, size, className }: AvatarProps) {
  const addDefaultSrc = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = defaultAvatar;
  };

  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const userData = userId && users[userId];

  useEffect(() => {
    if (userId) {
      if (!userData || !userData.id) {
        getUser({ userId: userId });
      }
    }
  }, [userId, userData]);

  useEffect(() => {
    if (userData) {
      const { avatar, firstName, lastName } = userData;
      setUrl(avatar?.[0]?.url || "");
      setName(
        `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim()
      );
    }
  }, [userData]);

  return (
    <div className={`Avatar ${size ? size : ""} ${className ? className : ""}`}>
      <img
        className="Avatar__img"
        src={url}
        onError={addDefaultSrc}
        alt={name}
        title={name}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(Avatar);
