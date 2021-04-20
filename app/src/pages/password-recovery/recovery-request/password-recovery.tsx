import assert from "assert";
import React, { useState } from "react";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Logo from "../../../components/logo";
import isEmailValid from "../../../utils/isEmailValid";
import "./password-recovery.css";
import axios from "axios";

const loadjs = require("loadjs");
function PasswordRecovery() {
  const [email, setEmail] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [
    requestSuccessfullySubmitted,
    setRequestSuccessfullySubmitted,
  ] = useState<boolean>(false);
  const [errorMessageResponse, setErrorMessageResponse] = useState<string>("");
  const [receivedError, setReceivedError] = useState<boolean>(false);

  loadjs("https://www.google.com/recaptcha/api.js");

  const sendPasswordRecoveryRequest = async (e: any) => {
    assert(
      process.env.REACT_APP_DEV_CAPTCHA_SITE_KEY,
      "Please set env variable REACT_APP_DEV_CAPTCHA_SITE_KEY"
    );
    const emailValue = (document.getElementById("recoveryEmail") as any).value;
    const captchaHTMLElement = document.querySelector(
      "#g-recaptcha-response"
    ) as any;
    const captchaData = captchaHTMLElement ? captchaHTMLElement.value : null;

    if (isEmailValid(emailValue)) {
      e.target.disabled = true;

      const headers = {
        "Accept": "application/json, text/plain, */*",
        "Content-type": "application/json",
      };
      setErrorMessageResponse("");
      setReceivedError(false);
      try {
        const req = await axios({
          method: "post",
          url: "/api/recover",
          headers: headers,
          data: JSON.stringify({ captcha: captchaData, email: emailValue }),
        });
        if (req.status === 200) {
          setRequestSuccessfullySubmitted(true);
        }
      } catch (exception) {
        setErrorMessageResponse(
          "Please ensure you have completed the captcha challenge."
        );
        e.target.disabled = false;
        setReceivedError(true);
      }
    } else {
      setEmailErrorMessage("Please enter a valid e-mail address.");
    }
  };

  return (
    <div className="Password-recovery-request-page">
      <header className="Password-recovery-request-page__header-bar">
        <Logo dark={true} />
      </header>
      {!requestSuccessfullySubmitted && (
        <div className="Password-recovery-request-page__input_section">
          <h2 className="black-header-text">
            Enter the e-mail address associated with your profile
          </h2>
          <Input
            label="Email"
            id="recoveryEmail"
            type="email"
            value={email}
            setValue={setEmail}
            errorMessage={emailErrorMessage}
          />
          <div className="Password-recovery-request-page__captcha">
            <div
              className="g-recaptcha"
              data-sitekey={process.env.REACT_APP_DEV_CAPTCHA_SITE_KEY}
            ></div>
          </div>
          {receivedError && (
            <div className="Password-recovery--captcha-error-message-section">
              <h4 className="captcha-error-message">{errorMessageResponse}</h4>
            </div>
          )}
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
      )}
      {requestSuccessfullySubmitted && (
        <div className="request-success-response-message">
          <h4>
            Your request is being processed. Please check your e-mail for
            further instructions.
          </h4>
        </div>
      )}
    </div>
  );
}

export default PasswordRecovery;
