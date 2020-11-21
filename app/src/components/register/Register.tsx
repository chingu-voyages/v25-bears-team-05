import React, { useState } from "react";
import Input from "../input";
import isEmailValid from "../../utils/isEmailValid";
import { isPasswordValid } from "../../utils/passwordValidations";
import "./Register.css";
import Button from "../button";
import { Link } from "react-router-dom";
import googleIcon from "../../images/googleicon.svg";
import axios from "axios";
import getInvalidPasswordMessage from "../../utils/getInvalidPasswordMessage";
import getInvalidEmailMessage from "../../utils/getInvalidEmailMessage";
import getInvalidNameMessage from "../../utils/getInvalidNameMessage";
import isNameValid from "../../utils/isNameValid";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(["", "", "", "", ""]);
  const handleErrorMessageReturn = (index: number, message: string) => {
    setErrorMessage((messages) => {
      const newMessages = [...messages];
      newMessages[index] = message;
      return newMessages;
    });
  };
  const handleRegister = async () => {
    const errors =
      !isEmailValid(email) ||
      !isPasswordValid(password) ||
      !isNameValid(firstName) ||
      !isNameValid(lastName);
    if (!errors) {
      let reqError;
      try {
        await axios({
          method: "post",
          url: "/register/local",
          data: {
            firstName,
            lastName,
            email,
            password,
          },
        });
      } catch (error) {
        console.error(error);
        reqError = error;
      } finally {
        typeof reqError?.message === "string" &&
          handleErrorMessageReturn(4, reqError.message);
      }
    }
  };

  return (
    <div className="Register">
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
        />
        <ul className="Register__error">
          {errorMessage.map((msg, i) => msg && <li key={msg + i}>{msg}</li>)}
        </ul>
      </div>
      <p className="Register__conditions">
        By clicking Agree &#38; Join, you agree to be kind.
      </p>
      <div className="Register__buttons">
        <Button
          onClick={handleRegister}
          type="submit"
          aria-label="Sign up"
          className="square primary"
        >
          Agree &#38; Join
        </Button>
        <Button
          type="submit"
          aria-label="Sign up"
          className="square Register__join-with-google"
        >
          <a
            href={`http://localhost:${process.env.REACT_APP_API_PORT}/auth/google`}
          >
            <div>
              <img className="Register__google-icon" src={googleIcon} alt="" />
            </div>
            <div>Join with Google</div>
          </a>
        </Button>
      </div>
      <p className="Register__already-registered">
        Already on SyncedUp? <Link to="/">Sign In</Link>
      </p>
    </div>
  );
}

export default Register;
