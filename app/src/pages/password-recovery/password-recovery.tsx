import assert from "assert";
import React, { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import Logo from "../../components/logo";
import isEmailValid from "../../utils/isEmailValid";
import "./password-recovery.css";

const loadjs = require("loadjs");
function PasswordRecovery() {
  const [email, setEmail] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const sendPasswordRecoveryRequest = (e:any) => {
    assert(process.env.REACT_APP_DEV_CAPTCHA_SITE_KEY, "Please set env variable REACT_APP_DEV_CAPTCHA_SITE_KEY")
    const emailValue = (document.getElementById("recoveryEmail") as any).value;
    if (isEmailValid(emailValue)) {
      e.target.disabled = true;
      
    } else {

      setEmailErrorMessage("Please enter a valid e-mail address.");
    }
  }
  loadjs("https://www.google.com/recaptcha/api.js");
  return (
    <div className="Password-recovery-request-page">
      <header className="Password-recovery-request-page__header-bar">
        <Logo dark={true} />
      </header>
      <div className="Password-recovery-request-page__input_section"> 
      <h2 className="black-header-text"> Enter the e-mail address associated with your profile</h2>
      
      <Input
        label="Email"
        id="recoveryEmail"
        type="email"
        value={email}
        setValue={setEmail}
        errorMessage={emailErrorMessage}
      />
      <div className="Password-recovery-request-page__captcha">
        <div className="g-recaptcha" data-sitekey={process.env.REACT_APP_DEV_CAPTCHA_SITE_KEY}></div>
      </div>
      <div className="Register__buttons">
        <Button
          onClick={sendPasswordRecoveryRequest}
          type="submit"
          aria-label="Submit"
          className="square Register__submit"
        >
          Submit
        </Button>
      </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
