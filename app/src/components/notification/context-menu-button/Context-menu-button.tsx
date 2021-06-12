import React from "react";
import "./context-menu-button-style.css";
function ContextMenuButton({
  className,
  clickHandler,
  children,
}: {
  className?: string;
  clickHandler: () => void;
  children: boolean | JSX.Element | JSX.Element[];
}) {
  return (
    <div
      className={`Context-menu-button__main ${className ? className : ""}`}
      onClick={clickHandler}
    >
      <div className="one-dot"></div>
      <div className="one-dot"></div>
      <div className="one-dot"></div>
      {children}
    </div>
  );
}

export default ContextMenuButton;
