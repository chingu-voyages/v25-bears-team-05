import React from "react";
import { IUserProcessed } from "../../../../services/user/user.type";
import Avatar from "../../../avatar/Avatar";

import ProfileCard from "../../../profileCard";
import "./search-result-user-card.css";

function UserSearchResultCard({
  id,
  firstName,
  lastName,
  jobTitle,
  avatar,
  nOfConnections,
  isAConnection,
}: IUserProcessed) {
  return (
    <div className="UserCard__main">
      <Avatar url={avatar?.[0]?.url} userName={`${firstName} ${lastName}`} />
      <ProfileCard
        type="profile"
        userId={id}
        data={{
          id,
          firstName,
          lastName,
          nOfConnections,
          isAConnection,
          jobTitle: jobTitle || "",
        }}
      />
    </div>
  );
}

export default UserSearchResultCard;
