import React from "react";

function DefaultResultStrip({ classNameInfo }: { classNameInfo?: string }) {
  return (
    <div
      className={`ResultStrip__Main-body Profile-strip ${
        classNameInfo ? classNameInfo : ""
      }`}
    >
      <div className="encircling-oval">
        <h4>No data</h4>
      </div>
      <div className="ResultStrip__name-section"></div>
    </div>
  );
}

export default DefaultResultStrip;
