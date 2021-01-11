import React, { useState } from "react";
import { connect } from "react-redux";
import { Action } from "redux";
import { addConnection } from "../../redux/actions/users";
import Button from "../button";
import OptionsMenu from "../optionsMenu";
import Spinner from "../spinner";
import "./FollowButton.css";

function FollowButton({
  addConnection,
  connectionName,
  connectionId,
  onFollow,
  className,
}: {
  addConnection: ({
    connectionId,
    isTeamMate,
  }: {
    connectionId: string;
    isTeamMate: boolean;
  }) => Action;
  connectionName: string;
  connectionId: string;
  onFollow: () => void;
  className?: string;
}) {
  const [isInProgress, setIsInProgress] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const handleAddConnection = ({ isTeamMate }: { isTeamMate: boolean }) => {
    addConnection({ connectionId, isTeamMate });
  };
  const handleClose = () => {
    isDone && onFollow();
    setIsDone(false);
    setIsInProgress(false);
  };
  return (
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

export default connect(null, { addConnection })(FollowButton);
