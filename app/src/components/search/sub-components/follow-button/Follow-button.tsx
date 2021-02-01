import React from "react";
import "./Follow-button.css";

export interface IFollowButtonProps {
  followButtonClicked: (e: any) => void;
}
function FollowButton({ followButtonClicked }: IFollowButtonProps) {
  const onFollowButtonClick = (e:any) => {
    followButtonClicked(e);
  };
  return (
    <p className="UserCard__follow-button" onClick={onFollowButtonClick}>
      + Follow
    </p>
  );
}

export default FollowButton;
