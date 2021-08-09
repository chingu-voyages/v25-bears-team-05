import React, { useEffect, useState } from "react";
import "./recovery-claim.css";
import { Link, useLocation } from "react-router-dom";
import { parseIdParameter } from "../utils/parse-id-parameter";
import assert from "assert";
import axios from "axios";
import Logo from "../../../components/logo";
import Input from "../../../components/input";
import Button from "../../../components/button";
import getInvalidPasswordMessage from "../../../utils/getInvalidPasswordMessage";
import { makeClaimRequest } from "../utils/make-claim-request";
import { isPasswordValid } from "../../../utils/passwordValidations";

function RecoveryClaim() {
  const search = useLocation().search;
  const parseResult = parseIdParameter({ fullQueryString: search });

  const id = new URLSearchParams(search).get("id")?.replace(/\s+/g, "+");
  const data = new URLSearchParams(search).get("data");

  const [firstPasswordEntry, setFirstPasswordEntry] = useState<string>("");
  const [secondPasswordEntry, setSecondPasswordEntry] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [hashedEmail, setHashedEmail] = useState<string>("");
  const [requestToken, setRequestToken] = useState<string>("");
  const [claimSuccessful, setClaimSuccessful] = useState<boolean>(false);
  const [showUpdateUI, setShowUpdateUI] = useState<boolean>(false);
  const [uiDisabled, setUIDisabled] = useState<boolean>(false);

  const [
    showRecoveryRequestLink,
    setShowRecoverRequestLink,
  ] = useState<boolean>(false);

  assert(id === parseResult, "id parameter query string mismatch"); // POIJ: Need a more graceful fail

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/recover/verify", {
          params: {
            id: id,
            data: data,
          },
        });
        setHashedEmail(res.data.id);
        setRequestToken(res.data.data);
        setShowUpdateUI(true);
      } catch (error) {
        console.log(error.response.statusText);
        setShowRecoverRequestLink(true);
        setShowErrorMessage(true);
        setErrorMessage(error.response.statusText);
        setShowUpdateUI(false);
      }
    })();
  }, []);

  const handleSubmitRequest = async () => {
    setUIDisabled(true);
    if (hashedEmail && requestToken) {
      if (
        isPasswordValid(firstPasswordEntry) &&
        isPasswordValid(secondPasswordEntry) &&
        firstPasswordEntry === secondPasswordEntry
      ) {
        makeClaimRequest({
          hashedEmail: hashedEmail,
          authToken: requestToken,
          updatedPasswords: {
            first_password: firstPasswordEntry,
            second_password: secondPasswordEntry,
          },
          onError: (error) => {
            setErrorMessage(error.statusText);
            setShowErrorMessage(true);
          },
          onSuccess: (_result) => {
            setClaimSuccessful(true);
            setShowUpdateUI(false);
            setShowErrorMessage(false);
          },
        });
      } else {
        setShowErrorMessage(true);
        setErrorMessage(
          "Please check that you've entered valid matching passwords."
        );
        setUIDisabled(false);
      }
    } else {
      setShowErrorMessage(true);
      setErrorMessage("Request cannot be completed");
      setShowUpdateUI(false);
      setUIDisabled(false);
    }
  };

  const passwordInputs = () => {
    return (
      <div className="Password-recovery-claim__input-section">
        <Input
          label="Enter a new password"
          id="updatePassword1"
          type="password"
          value={firstPasswordEntry}
          setValue={setFirstPasswordEntry}
          validationMessenger={getInvalidPasswordMessage}
          className="breakout-on-large-view"
          isDisabled={uiDisabled}
        />
        <Input
          label="Confirm new password"
          id="updatePassword2"
          type="password"
          value={secondPasswordEntry}
          setValue={setSecondPasswordEntry}
          validationMessenger={getInvalidPasswordMessage}
          className="breakout-on-large-view"
          actionOnEnterKey={handleSubmitRequest}
          isDisabled={uiDisabled}
        />
      </div>
    );
  };

  const submitButton = () => {
    return (
      <div className="Password-submit-buttons">
        <Button
          onClick={handleSubmitRequest}
          type="submit"
          aria-label="Submit"
          className="square Register__submit"
          id="submitButton"
          disabled={uiDisabled}
        >
          Submit
        </Button>
      </div>
    );
  };

  return (
    <div className="Password-recovery-claim__page">
      <header className="Password-recovery-request-page__header-bar">
        <Logo dark={true} />
        <h2 className="black-header-text">Recover password</h2>
      </header>
      {showUpdateUI && (
        <div>
          {passwordInputs()}
          {submitButton()}
        </div>
      )}
      {showErrorMessage && (
        <div className="Password-recovery-claim__error-messages">
          <p className="Password-recovery-claim__error-messages-content shadow-text">
            {" "}
            {errorMessage}{" "}
          </p>
          {showRecoveryRequestLink && (
            <Link to="/request-password-reset">Submit a new request</Link>
          )}
        </div>
      )}
      {claimSuccessful && (
        <div className="Password-recovery-claim-success">
          <p className="success-message">
            Password successfully updated. Please log in with your new
            credentials.
          </p>
          <Button className="square back-to-login-center">
            <Link to="/">Back to Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default RecoveryClaim;
