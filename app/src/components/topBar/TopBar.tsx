import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import { IUsersStore } from "../../services/user/user.type";
import Avatar from "../avatar";
import OptionsMenu from "../optionsMenu";
import "./TopBar.css";

function TopBar({ users }: { users: IUsersStore }) {
  useEffect(() => {
    if (!users?.me?.id) {
      getCurrentUserInfo();
    }
  }, [users?.me?.id]);
  const history = useHistory();
  return (
    <nav className="Top-bar">
      <OptionsMenu
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
    </nav>
  );
}

const mapStateToProps = (state: any) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(TopBar);
