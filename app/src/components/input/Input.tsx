import React, { useEffect, useRef, useState } from "react";
import { IInputProps, IInputAttributes } from "./input.types";
import "./Input.css";

function Input(props: IInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const propsErrorMessage = props.errorMessage;
  const errorMessageReturner = useRef(props.errorMessageReturner);
  const handleFocus = () => {
    props.onFocus?.();
    setIsFocused(true);
  };
  const handleBlur = () => {
    props.onBlur?.();
    setIsFocused(false);
  };

  const [errorMessage, setErrorMessage] = useState(propsErrorMessage || "");
  const validate = (currentPassword: string) => {
    if (props.validationMessenger) {
      const errorMessage = props.validationMessenger(currentPassword);
      setErrorMessage(errorMessage);
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.();
    e.target.value ? validate(e.target.value) : setErrorMessage("");
    props.setValue(e.target.value);
  };

  const attributes: IInputAttributes = { ...props };
  delete attributes.errorMessage;
  delete attributes.label;
  delete attributes.setValue;
  delete attributes.validationMessenger;
  delete attributes.errorMessageReturner;

  useEffect(() => {
    if (propsErrorMessage) {
      setErrorMessage(propsErrorMessage);
    }
  }, [propsErrorMessage]);

  useEffect(() => {
    errorMessageReturner.current?.(!isFocused ? errorMessage : "");
  }, [errorMessage, isFocused]);
  return (
    <div className={`wrapper__Input ${attributes.className || ""}`}>
      <input
        {...(attributes as IInputAttributes)}
        type={props.type && showPassword ? "text" : props.type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleOnChange}
        className={`Input ${errorMessage && !isFocused ? "Input--error" : ""} ${
          props.value ? "Input--has-content" : ""
        }`}
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
      {!errorMessageReturner.current && errorMessage && !isFocused && (
        <div
          error-for={props.id}
          className="Input__error"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Input;
