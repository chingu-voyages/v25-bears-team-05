import React from "react";
import "./Avatar.css";
import defaultAvatar from "../../images/defaultavatar0.svg";

function Avatar({
  url,
  userName,
  size,
  className,
}: {
  url?: string;
  userName: string;
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  const addDefaultSrc = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = defaultAvatar;
  };
  if (!url) {
    url = defaultAvatar;
  }
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
