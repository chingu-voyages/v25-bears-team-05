import React from "react";
import "./Avatar.css";
import defaultAvatar from "../../images/defaultavatar0.svg";
import { AvatarProps } from "./Avatar.type";

function Avatar({ url, userName, size, className }: AvatarProps) {
  const addDefaultSrc = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = defaultAvatar;
  };
  if (!url || url === "defaultAvatar") {
    url = defaultAvatar;
  }
  console.log({ url });
  return (
    <div className={`Avatar ${size ? size : ""} ${className ? className : ""}`}>
      <img
        className="Avatar__img"
        src={url}
        onError={addDefaultSrc}
        alt={userName}
      />
    </div>
  );
}

export default Avatar;
