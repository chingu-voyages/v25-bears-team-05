import React, { useState } from "react";
import Input from "../input";
import isEmailValid from "../../utils/isEmailValid";
import "./Login.css";
import Button from "../button";
import { Link } from "react-router-dom";
import googleIcon from "../../images/googleicon.svg";
import axios from "axios";

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
  const handleSignin = async () => {
    const errors = !isEmailValid(email) && setIsEmailError(true);
    if (!errors) {
      try {
        const req = await axios({
          method: "post",
          url: "localhost:5000/auth/local",
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
      }
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
    <div className="Login">
      <div className="Login__inputs">
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
