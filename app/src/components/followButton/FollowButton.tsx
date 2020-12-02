import React, { useState } from "react";
import { addConnection } from "../../services/user";
import Button from "../button";
import OptionsMenu from "../optionsMenu";
import Spinner from "../spinner";
import "./FollowButton.css";

function FollowButton({
  connectionName,
  connectionId,
  onFollow,
  className,
}: {
  connectionName: string;
  connectionId: string;
  onFollow: () => void;
  className: string;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isInProgress, setIsInProgress] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const handleAddConnection = ({ isTeamMate }: { isTeamMate: boolean }) => {
    const onSuccess = () => {
      setIsDone(true);
      setIsInProgress(false);
    };
    setIsInProgress(true);
    addConnection({
      connectionId,
      isTeamMate,
      onSuccess,
      onError: (msg: string) => setErrorMessage(msg),
    });
  };
  const handleClose = () => {
    isDone && onFollow();
    setErrorMessage("");
    setIsDone(false);
    setIsInProgress(false);
  };
  return (
    <div className={`Follow-button ${className}`}>
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
      {errorMessage && (
        <dialog className="Follow-button__error" open>
          <p className="Follow-button__error__message">{errorMessage}</p>
          <Button onClick={handleClose} className="square">
            Close
          </Button>
        </dialog>
      )}
      {isInProgress && (
        <dialog className="Follow-button__progress" open>
          <Spinner className="Follow-button__progress__spinner" />
        </dialog>
      )}
      {isDone && (
        <dialog className="Follow-button__done" open>
          <p className="Follow-button__done__message">Connection Added</p>
          <Button onClick={handleClose} className="square">
            OK
          </Button>
        </dialog>
      )}
    </div>
  );
}

export default FollowButton;
