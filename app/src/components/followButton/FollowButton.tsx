import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  // addConnectionAsync,
  requestAddConnectionAsync,
  selectCurrentUserId,
  selectIsAConnection,
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

  const currentUserId = useSelector(selectCurrentUserId, shallowEqual);
  const isMe = connectionId === "me" || connectionId === currentUserId;

  const handleAddConnection = ({ isTeamMate }: { isTeamMate: boolean }) => {
    dispatch(requestAddConnectionAsync({ connectionId, isTeamMate }));
  };

  return !isAConnection && !isMe ? (
    <div className={`Follow-button ${className || ""}`}>
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
    </div>
  ) : null;
}

export default FollowButton;
