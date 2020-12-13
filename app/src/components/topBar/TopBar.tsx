import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import Avatar from "../avatar";
import OptionsMenu from "../optionsMenu";
import "./TopBar.css";

function TopBar() {
  const [userInfo, setUserInfo] = useState<{
    url: string;
    firstName: string;
    lastName: string;
    id: string;
  }>();
  useEffect(() => {
    getCurrentUserInfo().then((userInfo) => {
      setUserInfo(userInfo);
    });
  }, []);
  const history = useHistory();
  return (
    <nav className="Top-bar">
      <OptionsMenu
        buttons={{
          "View Profile": { type: "link", linkTo: `/${userInfo?.id}/profile` },
          "Edit Profile": { type: "link", linkTo: "/me/profile" },
          Logout: {
            action: () => {
              history.push("/logout");
            },
            confirm: true,
          },
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
