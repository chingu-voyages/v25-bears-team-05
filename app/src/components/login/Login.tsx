import React, { useState } from "react";
import Input from "../input";
import isEmailValid from "../../utils/isEmailValid";
import { isPasswordValid } from "../../utils/passwordValidations";
import "./Login.css";
import Button from "../button";
import { Link } from "react-router-dom";
import googleIcon from "../../images/googleicon.svg";
import axios from "axios";
import getInvalidPasswordMessage from "../../utils/getInvalidPasswordMessage";
import getInvalidEmailMessage from "../../utils/getInvalidEmailMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const handleSignin = async () => {
    const errors = !isEmailValid(email) || !isPasswordValid(password);
    if (!errors) {
      let req;
      let reqError;
      try {
        req = await axios({
          method: "post",
          url: "/auth/local",
          data: {
            email,
            password,
          },
        });
        if (req.status === 401) {
          setPasswordErrorMessage("Invalid login!");
        }
      } catch (error) {
        console.error(error);
        reqError = error;
      } finally {
        typeof reqError?.message === "string" &&
          setPasswordErrorMessage(reqError.message);
      }
    }
  };

  return (
    <div className="Login">
      <div className="Login__inputs">
        <Input
          label="Email"
          id="loginEmail"
          type="email"
          value={email}
          setValue={setEmail}
          validationMessenger={getInvalidEmailMessage}
        />
        <Input
          label="Password"
          id="loginPassword"
          type="password"
          value={password}
          setValue={setPassword}
          validationMessenger={getInvalidPasswordMessage}
          errorMessage={passwordErrorMessage}
        />
      </div>
      <div className="Login__forgot-password">
        <Link to="/request-password-reset">Forgot password?</Link>
      </div>
      <div className="Login__buttons">
        <Button
          onClick={handleSignin}
          type="submit"
          aria-label="Sign in"
          className="round primary"
        >
          Sign in
        </Button>
        <div className="Login__or-rule">
          <span className="Login__or-rule__span">or</span>
        </div>
        <Button type="submit" aria-label="Sign in" className="round">
          <a
            href="localhost:5000/auth/google"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <img className="Login__google-icon" src={googleIcon} alt="" />
            </div>
            <div>Sign in with Google</div>
          </a>
        </Button>
      </div>
    </div>
  );
}

export default Login;
