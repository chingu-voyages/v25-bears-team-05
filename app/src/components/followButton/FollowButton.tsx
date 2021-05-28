import React, { useEffect, useState } from "react";
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
  const [connectionPending, setConnectionPending] = useState<boolean>(false);
  const currentUserId = useSelector(selectCurrentUserId, shallowEqual);
  const isMe = connectionId === "me" || connectionId === currentUserId;
  const isPendingConnection = useSelector(
    selectIsAPendingConnectionRequest(connectionId),
    shallowEqual
  );

  useEffect(() => {
    if (isPendingConnection) {
      setConnectionPending(true);
    } else {
      setConnectionPending(false);
    }
  }, [isPendingConnection]);
  const handleAddConnection = ({ isTeamMate }: { isTeamMate: boolean }) => {
    dispatch(requestAddConnectionAsync({ connectionId, isTeamMate }));
  };

  const handleCancelPendingConnectionRequest = () => {
    dispatch(cancelAddConnectionRequestAsync({ connectionId }));
  };

  return !isAConnection && !isMe ? (
    <div className={`Follow-button ${className || ""}`}>
      {!connectionPending && (
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
      {connectionPending && (
        <Button
          onClick={handleCancelPendingConnectionRequest}
          type="submit"
          aria-label="Cancel Connection Request"
          className="plain Btn-Cancel-request"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.989 19.129C15.989 16.883 13.802 15.74 11.672 14.822C9.549 13.908 8.871 13.138 8.871 11.488C8.871 10.499 9.519 10.821 9.803 9.007C9.923 8.255 10.495 8.995 10.605 7.278C10.605 6.594 10.292 6.424 10.292 6.424C10.292 6.424 10.451 5.411 10.513 4.631C10.577 3.814 10.115 2.071 8.212 1.536C7.88 1.195 7.655 0.653999 8.679 0.111999C6.439 0.00799879 5.918 1.18 4.725 2.042C3.71 2.798 3.436 3.995 3.485 4.632C3.55 5.412 3.708 6.425 3.708 6.425C3.708 6.425 3.394 6.595 3.394 7.279C3.504 8.997 4.078 8.256 4.197 9.008C4.481 10.822 5.13 10.5 5.13 11.489C5.13 13.139 4.918 13.699 2.794 14.613C0.663 15.53 0 17 0.011 19.129C0.014 19.766 0 20 0 20H16C16 20 15.989 19.766 15.989 19.129ZM16 10.039L13.701 7.641L12.64 8.702L15.039 11L12.641 13.298L13.702 14.359L16 11.961L18.298 14.359L19.359 13.298L16.961 11L19.358 8.702L18.297 7.641L16 10.039V10.039Z"
              fill="red"
            />
          </svg>
        </Button>
      )}
    </div>
  ) : null;
}

export default FollowButton;
