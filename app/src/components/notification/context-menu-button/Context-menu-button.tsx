import React from "react";
import "./context-menu-button-style.css";
function ContextMenuButton({ className }: { className?: string }) {
  return (
    <div className={`Context-menu-button__main ${className ? className : ""}`}>
      <div className="one-dot"></div>
      <div className="one-dot"></div>
      <div className="one-dot"></div>
    </div>
  );
}

export default ContextMenuButton;
