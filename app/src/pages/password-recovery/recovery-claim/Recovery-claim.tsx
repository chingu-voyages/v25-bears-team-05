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

  const [validRequestState, setValidRequestState] = useState<boolean>(true);
  const [firstPasswordEntry, setFirstPasswordEntry] = useState<string>("");
  const [secondPasswordEntry, setSecondPasswordEntry] = useState<string>("");
  const [requestErrorMessage, setRequestErrorMessage] = useState<string>("");
  const [hashedEmail, setHashedEmail] = useState<string>("");
  const [requestToken, setRequestToken] = useState<string>("");
  const [claimSuccessful, setClaimSuccessful] = useState<boolean>(false);
  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);

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
      } catch (error) {
        setValidRequestState(false);
        console.log(error.response.statusText);
        setRequestErrorMessage(error.response.statusText);
      }
    })();
  }, []);

  const handleSubmitRequest = async (e: any) => {
    e.target.disabled = true;
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
            setRequestErrorMessage(error.statusText);
            setValidRequestState(false);
          },
          onSuccess: (_result) => setClaimSuccessful(true),
        });
      } else {
        setRequestErrorMessage(
          "Please check that you've entered valid matching passwords."
        );
        setHasPasswordError(true);
        e.target.disabled = false;
      }
    } else {
      setRequestErrorMessage("Request cannot be completed");
      setValidRequestState(false);
      e.target.disabled = false;
    }
  };

  return (
    <div className="Password-recovery-claim__page">
      <header className="Password-recovery-request-page__header-bar">
        <Logo dark={true} />
        <h2 className="black-header-text">Recover password</h2>
      </header>
      {validRequestState === true && !claimSuccessful && (
        <div className="Password-recovery-claim__input-section">
          <Input
            label="Enter a new password"
            id="updatePassword1"
            type="password"
            value={firstPasswordEntry}
            setValue={setFirstPasswordEntry}
            validationMessenger={getInvalidPasswordMessage}
            className="breakout-on-large-view"
          />
          <Input
            label="Confirm new password"
            id="updatePassword2"
            type="password"
            value={secondPasswordEntry}
            setValue={setSecondPasswordEntry}
            validationMessenger={getInvalidPasswordMessage}
            className="breakout-on-large-view"
          />
        </div>
      )}
      {validRequestState === true && (
        <div className="Password-submit-buttons">
          <Button
            onClick={handleSubmitRequest}
            type="submit"
            aria-label="Submit"
            className="square Register__submit"
          >
            Submit
          </Button>
        </div>
      )}
      {hasPasswordError && (
        <div className="Password-recovery-claim__error-messages">
          <p className="Password-recovery-claim__error-messages-content shadow-text">
            {" "}
            {requestErrorMessage}{" "}
          </p>
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
