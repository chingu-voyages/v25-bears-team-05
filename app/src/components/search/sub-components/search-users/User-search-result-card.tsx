import React, { useEffect, useState } from "react";
import { IPublicUserDetails } from "../../../../services/search/search.types";
import { getUser } from "../../../../services/user";
import Avatar from "../../../avatar/Avatar";

import ProfileCard from "../../../profileCard";
import "./Search-result-user-card.css";

function UserSearchResultCard({
  id,
  firstName,
  lastName,
  jobTitle,
  avatar
}: IPublicUserDetails) {
  const [currentUserData, setCurrentUserData] = useState({})
  useEffect(()=> { 
    (async () => { 
      getUser({userId: id, onError: (message)=> { console.log(message)}, onSuccess: (data) => { 
       setCurrentUserData({...data, id})
      }})
    })()
  })
  return (
    <div className="UserCard__main">
      <Avatar url={avatar![0].url} userName={`${firstName} ${lastName}`} />
      <ProfileCard type="profile" userId={id} data={{id, firstName, lastName, ...currentUserData, jobTitle: jobTitle || ""}} />
    </div>
  );
};

export default UserSearchResultCard;
