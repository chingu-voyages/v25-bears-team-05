import React from "react";
import "./context-menu-button-style.css";
function ContextMenuButton({ classNames }: { classNames?: string }) {
  return (
    <div
      className={`Context-menu-button__main ${classNames ? classNames : ""}`}
    >
      <div className="one-dot"></div>
      <div className="one-dot"></div>
      <div className="one-dot"></div>
    </div>
  );
}

export default ContextMenuButton;
