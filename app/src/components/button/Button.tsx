import React from "react";
import "./Button.css";

function Button({
  className,
  onClick = () => null,
  children,
}: {
  className?: string;
  onClick?: (...args: any) => any;
  children?: React.ReactNode;
}) {
  return (
    <button className={`Button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
