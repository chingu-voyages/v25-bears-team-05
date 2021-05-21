import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  cancelAddConnectionRequestAsync,
  requestAddConnectionAsync,
  selectCurrentUserId,
  selectIsAConnection,
  selectIsAPendingConnectionRequest,
} from "../../pages/profile/profileSlice";
import Button from "../button";
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
  const isPendingConnection = useSelector(
    selectIsAPendingConnectionRequest(connectionId),
    shallowEqual
  );

  const handleAddConnection = ({ isTeamMate }: { isTeamMate: boolean }) => {
    dispatch(requestAddConnectionAsync({ connectionId, isTeamMate }));
  };

  const handleCancelPendingConnectionRequest = () => {
    dispatch(cancelAddConnectionRequestAsync({ connectionId }));
  };

  return !isAConnection && !isMe ? (
    <div className={`Follow-button ${className || ""}`}>
      {!isPendingConnection && (
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
      {isPendingConnection && (
        <Button
          onClick={handleCancelPendingConnectionRequest}
          type="submit"
          aria-label="Cancel Connection Request"
          className="plain"
        >
          Cancel Connection Request
        </Button>
      )}
    </div>
  ) : null;
}

export default FollowButton;
