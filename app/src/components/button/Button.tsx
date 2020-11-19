import React from "react";
import "./Button.css";

function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return <button {...props} className={`Button ${props.className}`} />;
}

export default Button;
