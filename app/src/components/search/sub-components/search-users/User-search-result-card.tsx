import React from "react";
import ProfileCard from "../../../profileCard";
import "./search-result-user-card.css";

function UserSearchResultCard({ id }: { id: string }) {
  return (
    <div className="UserCard__main">
      <ProfileCard type="search" userId={id} />
    </div>
  );
}

export default UserSearchResultCard;
