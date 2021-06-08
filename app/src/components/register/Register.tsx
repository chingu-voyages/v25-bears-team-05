import React, { useState } from "react";
import Input from "../input";
import "./Register.css";
import Button from "../button";
import { Link, Redirect } from "react-router-dom";
import googleIcon from "../../images/googleicon.svg";
import getInvalidPasswordMessage from "../../utils/getInvalidPasswordMessage";
import getInvalidEmailMessage from "../../utils/getInvalidEmailMessage";
import getInvalidNameMessage from "../../utils/getInvalidNameMessage";
import localRegister from "../../services/localRegister";
import googleAuth from "../../services/googleAuth";
import Spinner from "../../pages/status/components/spinner";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessages, setErrorMessages] = useState(["", "", "", "", ""]);
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const handleSetDone = (isDone: boolean) => {
    setDone(isDone);
    setInProgress(false);
  };
  const handleSetErrorMessages = (messages: string[]) => {
    setTimeout(() => setErrorMessages?.(messages), 0);
  };
  const handleErrorMessageReturn = (index: number, message: string) => {
    setErrorMessages((messages) => {
      const newMessages = [...messages];
      newMessages[index] = message;
      return newMessages;
    });
  };
  const handleLocalSignup = () => {
    setInProgress(true);
    localRegister({
      firstName,
      lastName,
      email,
      password,
      setDone: handleSetDone,
      setErrorMessages: handleSetErrorMessages,
    });
  };
  const handleGoogleSignup = () => {
    setInProgress(true);
    googleAuth({
      setDone: handleSetDone,
      setErrorMessage: (msg: string) => {
        handleSetErrorMessages([msg]);
      },
    });
  };

  return done ? (
    <Redirect to="/login" />
  ) : (
    <div className="Register">
      {inProgress ? (
        <Spinner
          className="Register__spinner"
          message="Creating your new account"
        />
      ) : (
        <>
          <div className="Register__inputs">
            <Input
              label="First name"
              id="registrationFirstName"
              type="text"
              value={firstName}
              setValue={setFirstName}
              validationMessenger={getInvalidNameMessage}
              errorMessageReturner={(message) =>
                handleErrorMessageReturn(0, message)
              }
              className="breakout-on-large-view"
            />
            <Input
              label="Last name"
              id="registrationLastName"
              type="text"
              value={lastName}
              setValue={setLastName}
              validationMessenger={getInvalidNameMessage}
              errorMessageReturner={(message) =>
                handleErrorMessageReturn(1, message)
              }
              className="breakout-on-large-view"
            />
            <Input
              label="Email"
              id="registrationEmail"
              type="email"
              value={email}
              setValue={setEmail}
              validationMessenger={getInvalidEmailMessage}
              errorMessageReturner={(message) =>
                handleErrorMessageReturn(2, message)
              }
              className="breakout-on-large-view"
            />
            <Input
              label="Password"
              id="registrationPassword"
              type="password"
              value={password}
              setValue={setPassword}
              validationMessenger={getInvalidPasswordMessage}
              errorMessageReturner={(message) =>
                handleErrorMessageReturn(3, message)
              }
              className="breakout-on-large-view"
            />
            <ul className="Register__error">
              {errorMessages.map(
                (msg, i) => msg && <li key={msg + i}>{msg}</li>
              )}
            </ul>
          </div>
          <p className="Register__conditions">
            By clicking Agree &#38; Join, you agree to be kind.
          </p>
          <div className="Register__buttons">
            <Button
              onClick={handleLocalSignup}
              type="submit"
              aria-label="Sign up"
              className="square Register__submit"
            >
              Agree &#38; Join
            </Button>
            <div className="Register__or-rule">
              <span className="Register__or-rule__span">or</span>
            </div>
            <Button
              type="submit"
              onClick={handleGoogleSignup}
              aria-label="Sign up"
              className="square Register__join-with-google"
            >
              <div>
                <img
                  className="Register__google-icon"
                  src={googleIcon}
                  alt=""
                />
              </div>
              <div>Join with Google</div>
            </Button>
          </div>
          <p className="Register__already-registered">
            Already on SyncedUp? <Link to="/">Sign In</Link>
          </p>
        </>
      )}
    </div>
  );
}

export default Register;
