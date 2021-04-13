import React from "react";
import Spinner from "../spinner";
import "./StatusSpinner.css";

function StatusSpinner({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const idleKeys = ["", "idle"];
  return !idleKeys.includes(status) ? (
    <Spinner message={status} className={`Status-spinner ${className || ""}`} />
  ) : null;
}

export default StatusSpinner;
