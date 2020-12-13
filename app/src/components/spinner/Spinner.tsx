import React from "react";
import "./Spinner.css";

function Spinner({
  className,
  message,
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div className={`wrapper__Spinner ${className}`}>
      <svg
        className="Spinner"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="42"></circle>
      </svg>
      {message && <p className="Spinner__message">{message}</p>}
    </div>
  );
}

export default Spinner;
