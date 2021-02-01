import React, { useEffect, useState } from "react";
import Avatar from "../../../avatar";
import "./search-result-user-card.css";
interface IUserSearchResultCard {
  avatarUrl: string;
  jobTitle: string;
  name: string;
  timeAgo?: Date;
  visibility?: string;
}
const UserSearchResultCard = ({
  name,
  jobTitle,
  avatarUrl,
  timeAgo,
  visibility,
}: IUserSearchResultCard) => {
  return (
    <div className="UserCard__main">
      <div className="UserCard__main">
        <Avatar userName={name} url={avatarUrl} />
        <p className="UserCard__name"> {name}</p>
        <p className="UserCard__jobTitle"> {jobTitle} </p>
        <p className="UserCard__timeAgo">{timeAgo} | </p>
        <p className="UserCard__visibility">{visibility}</p>
        {/* <FollowButton followButtonClicked={handleFollowButtonClicked} /> */}
      </div>
    </div>
  );
};

export default UserSearchResultCard;
