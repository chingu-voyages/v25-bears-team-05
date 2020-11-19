import React, { useState } from "react";
import Input from "../input";
import isEmailValid from "../../utils/isEmailValid";
import "./Login.css";
import Button from "../button";

function Login() {
  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const validateEmail = (currentEmail: string) => {
    setIsEmailError(!isEmailValid(currentEmail));
  };
  const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? validateEmail(e.target.value) : setIsEmailError(false);
    setEmail(e.target.value);
  };
  const handleSignin = () => {
    const errors = !isEmailValid(email) && setIsEmailError(true);
    if (!errors) {
      // axios
    }
  };
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const validatePassword = (currentPassword: string) => {
    let errors = [];
    currentPassword.length < 8 && errors.push("at least 8 characters");
    (!currentPassword.match(/[A-Z]/) || !currentPassword.match(/[a-z]/)) &&
      errors.push("a mix of uppercase and lowercase");
    setPasswordErrorMessage(
      errors.length > 0
        ? ["Password requires ", errors.join(" and ")].join("")
        : ""
    );
  };
  const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value
      ? validatePassword(e.target.value)
      : setPasswordErrorMessage("");
    setPassword(e.target.value);
  };
  return (
    <div className="Login-component">
      <h2>Login component - TODO</h2>
      <Input
        label="Email"
        id="loginEmail"
        type="email"
        value={email}
        onChange={handleEmailOnChange}
        errorMessage={isEmailError ? "Please enter a valid email" : ""}
      />
      <Input
        label="Password"
        id="loginPassword"
        type="password"
        value={password}
        onChange={handlePasswordOnChange}
        errorMessage={passwordErrorMessage}
      />
      <Button onClick={handleSignin} type="submit" aria-label="Sign in">
        Sign in
      </Button>
    </div>
  );
}

export default Login;
