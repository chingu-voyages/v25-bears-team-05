import React, { useEffect } from "react";
import "./Network.css";
import backIcon from "../../images/backicon.svg";
import Button from "../../components/button";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getUser, removeConnection } from "../../services/user";
import ProfileCard from "../../components/profileCard";
import OptionsMenu from "../../components/optionsMenu";
import { IUserConnection, IUsersStore } from "../../services/user/user.type";
import Nav from "../../components/nav";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import { connect } from "react-redux";
import TopBar from "../../components/topBar";

function Network({ users }: { users: IUsersStore }) {
  const match: any = useRouteMatch("/:userId");
  const userId = match.params.userId.toLowerCase();
  const history = useHistory();
  const handleGoBack = () => history.goBack();
  const connections = Object.values(users[userId]?.connections || {});
  const handleRemoveConnection = (connectionId: string) => {
    removeConnection({connectionId});
  };

  const currentUserId = users?.me?.id;
  const isMe = currentUserId === userId || userId.match("me");

  useEffect(() => {
    if (!currentUserId) {
      getCurrentUserInfo();
    }
  }, []);

  useEffect(() => {
    if (userId && !users?.[userId]) {
      getUser({userId});
    }
  }, [userId, users?.[userId]]);

  const RemoveOption = ({
    connectionData,
  }: {
    connectionData: IUserConnection;
  }) => (
    <OptionsMenu
      buttons={{
        "Remove connection": {
          action: () => {
            handleRemoveConnection(connectionData.userId);
          },
          confirm: true,
        },
      }}
      refTitle={`${connectionData.firstName} ${connectionData.lastName}`}
    />
  );
  const ConnectionItem = ({
    connectionData,
  }: {
    connectionData: IUserConnection;
  }) => (
    <li key={connectionData.userId}>
      <ProfileCard type="connection" userId={connectionData.userId} />
      {isMe && <RemoveOption {...{ connectionData }} />}
    </li>
  );
  return (
    <div className="Network-page">
      <header className="Network-page__top-bar--mobile">
        <Button role="link" onClick={handleGoBack}>
          <img className="Network-page__back-icon" src={backIcon} alt="back" />
        </Button>
        <h1 className="Network-page__title">Connections</h1>
      </header>
      <TopBar className="Network-page__top-bar--desktop" />
      <main className="Network-page__main">
        <ul className="Network-page__connections-list">
          {connections.map((connectionData) => (
            <ConnectionItem key={connectionData.userId} {...{ connectionData }} />
          ))}
        </ul>
      </main>
      <Nav />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(Network);
