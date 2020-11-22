import React, { useState } from "react";
import Input from "../input";
import "./Login.css";
import Button from "../button";
import { Link } from "react-router-dom";
import googleIcon from "../../images/googleicon.svg";
import axios from "axios";
import getInvalidPasswordMessage from "../../utils/getInvalidPasswordMessage";
import getInvalidEmailMessage from "../../utils/getInvalidEmailMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const handleSignin = async () => {
    const errors = {
      email: getInvalidEmailMessage(email),
      password: getInvalidPasswordMessage(password),
    };
    setEmailErrorMessage(errors.email);
    setPasswordErrorMessage(errors.password);
    const thereAreErrors = !Object.values(errors).some((error) => error);
    if (thereAreErrors) {
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
  console.log(process.env.REACT_APP_API_PORT);
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
          errorMessage={emailErrorMessage}
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
            href={`http://localhost:${process.env.REACT_APP_API_PORT}/auth/google`}
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
