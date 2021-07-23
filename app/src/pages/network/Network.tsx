import React, { useEffect, useRef } from "react";
import "./Network.css";
import { Link, useRouteMatch } from "react-router-dom";
import ProfileCard from "../../components/profileCard";
import OptionsMenu from "../../components/optionsMenu";
import { IUserConnection } from "../../services/user/user.type";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  removeConnectionAsync,
  selectCurrentUserId,
  selectProfileStatus,
  selectUserConnections,
} from "../profile/profileSlice";
import Status from "../../components/status";
import Page from "../../components/page";

function Network() {
  const match: any = useRouteMatch("/:userId");
  const userId = useRef(match.params.userId.toLowerCase());

  const connections = useSelector(
    selectUserConnections(userId.current),
    shallowEqual
  );
  const status = useSelector(selectProfileStatus, shallowEqual);
  const currentUserId = useSelector(selectCurrentUserId, shallowEqual);
  const isMe = userId.current === "me" || userId.current === currentUserId;
  const dispatch = useDispatch();

  // fetch user data for each connection
  useEffect(() => {}, [connections]);

  const RemoveOption = ({
    connectionData,
  }: {
    connectionData: IUserConnection;
  }) => {
    return (
      <OptionsMenu
        buttons={{
          "Remove connection": {
            action: () => {
              dispatch(
                removeConnectionAsync({ connectionId: connectionData.userId })
              );
            },
            confirm: true,
          },
        }}
        refTitle={`${connectionData.firstName} ${connectionData.lastName}`}
      />
    );
  };

  return (
    <Page className="Network-page">
      <Status status={status} />
      <main className="Network-page__main">
        <ul className="Network-page__connections-list">
          {connections &&
            (Object.values(connections) as IUserConnection[]).map(
              (connectionData) => (
                <li key={connectionData.userId}>
                  <Link
                    className="connections-list__link"
                    to={`/${connectionData.userId}/profile`}
                  >
                    <ProfileCard
                      type="connection"
                      {...{ userId: connectionData.userId, connectionData }}
                    />
                  </Link>
                  {isMe && <RemoveOption {...{ connectionData }} />}
                </li>
              )
            )}
        </ul>
      </main>
    </Page>
  );
}

export default Network;
