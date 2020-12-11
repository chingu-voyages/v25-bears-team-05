import React, { useEffect, useState } from "react";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import Avatar from "../avatar";
import OptionsMenu from "../optionsMenu";
import "./TopBar.css";

function TopBar() {
  const [userInfo, setUserInfo] = useState<{
    url: string;
    firstName: string;
    lastName: string;
  }>();
  useEffect(() => {
    getCurrentUserInfo().then((userInfo) => {
      setUserInfo(userInfo);
    });
  }, []);
  return (
    <nav className="Top-bar">
      <OptionsMenu
        buttons={{
          "View Profile": { action: () => {} },
          "Edit Profile": { action: () => {} },
          Logout: { action: () => {}, confirm: true },
        }}
      >
        <Avatar
          size="xsmall"
          url={userInfo?.url || ""}
          userName={
            userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ""
          }
        />
      </OptionsMenu>
    </nav>
  );
}

export default TopBar;
