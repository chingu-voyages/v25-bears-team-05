import React, { useEffect, useState } from "react";
import "./Avatar.css";
import defaultAvatar from "../../images/defaultavatar0.svg";
import { AvatarProps } from "./Avatar.type";

function Avatar({ userData, size, className }: AvatarProps) {
  const addDefaultSrc = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = defaultAvatar;
  };

  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

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

export default Avatar;
