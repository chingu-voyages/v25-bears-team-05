import React from "react";
import { statusStates } from "../../utils/stateStatus";
import Spinner from "../spinner";
import "./StatusSpinner.css";

function StatusSpinner({
  status,
  className,
}: {
  status: {
    state: keyof typeof statusStates;
    [stateKey: string]: string;
  };
  className?: string;
}) {
  return status.state === statusStates.loading ? (
    <Spinner
      message={status[status.state]}
      className={`Status-spinner ${className || ""}`}
    />
  ) : null;
}

export default StatusSpinner;
