import React from "react";
import { useHistory } from "react-router-dom";
import { IUser } from "../../services/user/user.type";
import Avatar from "../avatar";
import Logo from "../logo";
import Nav from "../nav";
import OptionsMenu from "../optionsMenu";
import Search from "../search";
import "./TopBar.css";

function TopBar({
  currentUserData,
  className,
}: {
  currentUserData: IUser;
  className?: string;
}) {
  const history = useHistory();
  return (
    <nav className={`Top-bar ${className || ""}`}>
      <Logo className="Top-bar__logo" condensed />
      <OptionsMenu
        className="Top-bar__avatar-menu"
        buttons={{
          "View Profile": {
            type: "link",
            linkTo: `/${currentUserData?.id || "me"}/profile`,
          },
          "Edit Profile": { type: "link", linkTo: "/me/profile" },
          Logout: {
            action: () => {
              history.push("/logout");
            },
            confirm: true,
          },
        }}
      >
        <Avatar size="xsmall" userData={currentUserData} />
      </OptionsMenu>
      <Search className="Top-bar__search" />
      <Nav className="Top-bar__nav" userData={currentUserData} />
    </nav>
  );
}

export default TopBar;
