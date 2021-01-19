import React, { useEffect } from "react";
import "./Network.css";
import backIcon from "../../images/backicon.svg";
import Button from "../../components/button";
import { useHistory, useRouteMatch } from "react-router-dom";
import Nav from "../../components/nav";
import { connect } from "react-redux";
import TopBar from "../../components/topBar";
import { fetchUserData } from "../../redux/actions/users";
import Connection from "../../components/connection";
import { IUser } from "../../services/user/user.type";

function Network({ users, fetchUserData }: any) {
  const match: any = useRouteMatch("/:userId");
  const userId = match.params.userId.toLowerCase();
  const userData: IUser = users[userId];
  const history = useHistory();
  const handleGoBack = () => {
    if (!(history.location as any)?.state?.from?.match(/login|logout/)) {
      history.goBack();
    } else {
      history.push("/");
    }
  };
  const connections = Object.values(userData?.connections || {});

  useEffect(() => {
    if (userId && !userData) {
      fetchUserData(userId);
    }
  }, [userId, userData]);

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
          {connections.map((connectionReference) => (
            <Connection
              key={connectionReference.userId}
              {...{ connectionReference, networksUsersData: userData }}
            />
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

export default connect(mapStateToProps, { fetchUserData })(Network);
