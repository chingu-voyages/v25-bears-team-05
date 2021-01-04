import React, { useState } from "react";
import Input from "../input";
import "./Login.css";
import Button from "../button";
import { Link, Redirect } from "react-router-dom";
import googleIcon from "../../images/googleicon.svg";
import getInvalidEmailMessage from "../../utils/getInvalidEmailMessage";
import googleAuth from "../../services/googleAuth";
import localLogin from "../../services/localLogin";
import Spinner from "../spinner";

function Login({className} : {className?: string}) {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const handleSetDone = (isDone: boolean) => {
    setDone(isDone);
    setInProgress(false);
  };
  const handleLocalSignin = () => {
    setInProgress(true);
    localLogin({
      email,
      password,
      setDone: handleSetDone,
      setEmailErrorMessage,
      setPasswordErrorMessage,
    });
  };
  const handleGoogleSignin = () => {
    setInProgress(true);
    googleAuth({ setDone: handleSetDone, setErrorMessage });
  };

  return done ? (
    <Redirect to="/login" />
  ) : (
    <div className={`Login ${className || ""}`}>
      {inProgress ? (
        <Spinner
          className="Login__spinner"
          message="Checking your details..."
        />
      ) : (
        <>
          {" "}
          <div className="Login__inputs">
            <Input
              label="Email"
              id="loginEmail"
              type="email"
              value={email}
              setValue={setEmail}
              validationMessenger={getInvalidEmailMessage}
              errorMessage={emailErrorMessage}
            />
            <Input
              label="Password"
              id="loginPassword"
              type="password"
              value={password}
              setValue={setPassword}
              errorMessage={passwordErrorMessage}
            />
          </div>
          <div className="Login__forgot-password">
            <Link to="/request-password-reset">Forgot password?</Link>
          </div>
          <div className="Login__buttons">
            <Button
              onClick={handleLocalSignin}
              type="submit"
              aria-label="Sign in"
              className="round primary"
            >
              Sign in
            </Button>
            <div className="Login__or-rule">
              <span className="Login__or-rule__span">or</span>
            </div>
            <Button
              onClick={handleGoogleSignin}
              type="submit"
              aria-label="Sign in"
              className="round"
            >
              <div>
                <img className="Login__google-icon" src={googleIcon} alt="" />
              </div>
              <div>Sign in with Google</div>
            </Button>
            {errorMessage && <p className="Login__error">{errorMessage}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
