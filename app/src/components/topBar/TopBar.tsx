import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import Avatar from "../avatar";
import Logo from "../logo";
import Nav from "../nav";
import OptionsMenu from "../optionsMenu";
import Search from "../search";
import "./TopBar.css";

function TopBar({className}: {className?: string}) {
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
    <nav className={`Top-bar ${className || ""}`}>
      <Logo className="Top-bar__logo" condensed />
      <OptionsMenu
        className="Top-bar__avatar-menu"
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
      <Search className="Top-bar__search" />
      <Nav className="Top-bar__nav" />
    </nav>
  );
}

export default TopBar;
