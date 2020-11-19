import React, { useState } from "react";
import { IInputProps, IInputAttributes } from "./input.types";
import "./Input.css";

function Input(props: IInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleFocus = () => {
    props.onFocus?.();
    setIsFocused(true);
  };
  const handleBlur = () => {
    props.onBlur?.();
    setIsFocused(false);
  };
  const attributes = { ...props };
  delete attributes.errorMessage;
  delete attributes.label;
  return (
    <div className="wrapper__Input">
      <input
        {...(attributes as IInputAttributes)}
        type={props.type && showPassword ? "text" : props.type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`Input ${attributes.className} ${
          props.errorMessage && !isFocused ? "Input--error" : ""
        } ${props.value ? "Input--has-content" : ""}`}
      />
      <label
        className="Input__label--floating"
        htmlFor={props.id}
        aria-hidden="true"
      >
        {props.label}
      </label>
      {props.type === "password" && (
        <div
          onClick={() => setShowPassword((show) => !show)}
          className="Input__show-password-toggle"
          role="button"
          tabIndex={0}
        >
          {showPassword ? "Hide" : "Show"}
        </div>
      )}
      {props.errorMessage && !isFocused && (
        <div
          error-for={props.id}
          className="Input__error"
          role="alert"
          aria-live="assertive"
        >
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export default Input;
