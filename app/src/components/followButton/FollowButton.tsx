import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  // addConnectionAsync,
  requestAddConnectionAsync,
  selectCurrentUserId,
  selectIsAConnection,
  selectIsAPendingConnectionRequest,
} from "../../pages/profile/profileSlice";
import OptionsMenu from "../optionsMenu";
import "./FollowButton.css";

function FollowButton({
  connectionName,
  connectionId,
  className,
}: {
  connectionName: string;
  connectionId: string;
  className?: string;
}) {
  const dispatch = useDispatch();
  const isAConnection = useSelector(
    selectIsAConnection(connectionId),
    shallowEqual
  );
  const isAPendingConnectionRequest = useSelector(
    selectIsAPendingConnectionRequest(connectionId),
    shallowEqual
  );

  const currentUserId = useSelector(selectCurrentUserId, shallowEqual);
  const isMe = connectionId === "me" || connectionId === currentUserId;

  const handleAddConnection = ({ isTeamMate }: { isTeamMate: boolean }) => {
    dispatch(requestAddConnectionAsync({ connectionId, isTeamMate }));
  };

  const handleCancelAddConnection = () => {
    // Do something
  };
  return !isAConnection && !isMe ? (
    <div className={`Follow-button ${className || ""}`}>
      {!isAPendingConnectionRequest && (
        <OptionsMenu
          className="Follow-button__options-menu"
          buttons={{
            [`Add ${connectionName} as a connection`]: {
              action: () => {
                handleAddConnection({ isTeamMate: false });
              },
            },
            [`Add ${connectionName} as a team mate`]: {
              action: () => {
                handleAddConnection({ isTeamMate: true });
              },
            },
          }}
        >
          <span className="Follow-button__text">+ Follow</span>
        </OptionsMenu>
      )}
      {isAPendingConnectionRequest && (
        <OptionsMenu
          className="Follow-button__options-menu"
          buttons={{
            [`Cancel pending connection request to ${connectionName}`]: {
              action: () => {
                handleCancelAddConnection();
              },
            },
          }}
        >
          <span className="Follow-button__text">+ Follow</span>
        </OptionsMenu>
      )}
    </div>
  ) : null;
}

export default FollowButton;
