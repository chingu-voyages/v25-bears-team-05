import React from "react";
import { statusStates } from "../../StatusSetter";
import PageError from "../pageError";
import Spinner from "../spinner";
import "./Status.css";

function Status({
  status,
  className,
}: {
  status: {
    state: keyof typeof statusStates;
    [stateKey: string]: string;
  };
  className?: string;
}) {
  switch (status.state) {
    case statusStates.loading:
      return (
        <Spinner
          message={status[status.state]}
          className={`Status-spinner ${className || ""}`}
        />
      );
    case statusStates.error:
      return <PageError error={status.error} />;
    default:
      return null;
  }
}

export default Status;
