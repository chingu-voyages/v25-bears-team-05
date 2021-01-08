import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import { IUsersStore } from "../../services/user/user.type";
import Avatar from "../avatar";
import Logo from "../logo";
import Nav from "../nav";
import OptionsMenu from "../optionsMenu";
import Search from "../search";
import "./TopBar.css";

function TopBar({
  users,
  className,
}: {
  users: IUsersStore;
  className?: string;
}) {
  useEffect(() => {
    if (!users?.me?.id) {
      getCurrentUserInfo();
    }
  }, [users?.me?.id]);
  const history = useHistory();
  return (
    <nav className={`Top-bar ${className || ""}`}>
      <Logo className="Top-bar__logo" condensed />
      <OptionsMenu
        className="Top-bar__avatar-menu"
        buttons={{
          "View Profile": {
            type: "link",
            linkTo: `/${users?.me?.id || "me"}/profile`,
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
        <Avatar size="xsmall" userId="me" />
      </OptionsMenu>
      <Search className="Top-bar__search" />
      <Nav className="Top-bar__nav" />
    </nav>
  );
}

const mapStateToProps = (state: any) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(TopBar);
