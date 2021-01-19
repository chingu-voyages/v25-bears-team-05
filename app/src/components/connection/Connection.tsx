import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, removeConnection } from "../../redux/actions/users";
import { IStoreState } from "../../redux/store.type";
import { IUser, IUserConnection } from "../../services/user/user.type";
import OptionsMenu from "../optionsMenu";
import ProfileCard from "../profileCard";
import "./Connection.css";

function Connection({
  connectionReference,
  networksUsersData,
}: {
  connectionReference: IUserConnection;
  networksUsersData: IUser;
}) {
  const userData = useSelector(
    (state: IStoreState) => state.users[connectionReference.userId]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData(connectionReference.userId));
    }
  }, []);
  return (
    <li className="Connection" key={connectionReference.userId}>
      <ProfileCard
        type="connection"
        userData={userData}
        connectionData={connectionReference}
      />
      {networksUsersData?.isCurrentUser && userData && (
        <OptionsMenu
          buttons={{
            "Remove connection": {
              action: () => {
                dispatch(removeConnection(connectionReference.userId));
              },
              confirm: true,
            },
          }}
          refTitle={`${userData.firstName} ${userData.lastName}`}
        />
      )}
    </li>
  );
}

export default Connection;
