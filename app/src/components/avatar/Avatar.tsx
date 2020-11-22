import React from "react";
import "./Avatar.css";
import defaultAvatar from "../../images/defaultavatar0.svg";

function Avatar({
  url,
  userName,
  size,
}: {
  url?: string;
  userName: string;
  size?: "small" | "medium" | "large";
}) {
  const addDefaultSrc = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = defaultAvatar;
  };
  if (!url) {
    url = defaultAvatar;
  }
  return (
    <div className={`Avatar ${size}`}>
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
