import React, { useEffect, useState } from "react";
import "./recovery-claim.css";
import { useLocation } from "react-router-dom";
import { parseIdParameter } from "../utils/parse-id-parameter";
import assert from "assert";
import axios from "axios";
import Logo from "../../../components/logo";
import Input from "../../../components/input";
import Button from "../../../components/button";
import getInvalidPasswordMessage from "../../../utils/getInvalidPasswordMessage";
import { makeClaimRequest } from "../utils/make-claim-request";

function RecoveryClaim() {
  const search = useLocation().search;
  const parseResult = parseIdParameter({ fullQueryString: search });
  const id = new URLSearchParams(search).get("id")?.replace(" ", "+");
  const data = new URLSearchParams(search).get("data");
  const [validRequestState, setValidRequestState] = useState<boolean>(true);
  const [firstPasswordEntry, setFirstPasswordEntry] = useState("");
  const [secondPasswordEntry, setSecondPasswordEntry] = useState("");
  const [requestErrorMessage, setRequestErrorMessage] = useState("");
  const [hashedEmail, setHashedEmail] = useState<string>("");
  const [requestToken, setRequestToken] = useState<string>("");
  const [claimSuccessful, setClaimSuccessful] = useState<boolean>(false);
  // const [errorMessages, setErrorMessages] = useState(["", "", "", "", ""]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  /* URLSearchParams replaces the '+' symbol with spaces. This assert is
    to ensure that the parseResult and the .replace(" ", "+") method call
    return identical values
  */
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

  const handleSubmitRequest = async () => {
    if (hashedEmail && requestToken) {
      if (firstPasswordEntry === secondPasswordEntry) {
        makeClaimRequest({
          hashedEmail: hashedEmail,
          authToken: requestToken,
          updatedPasswords: {
            first_password: firstPasswordEntry,
            second_password: secondPasswordEntry,
          },
          onError: (error) => setRequestErrorMessage(error.statusText),
          onSuccess: (_result) => setClaimSuccessful(true),
        });
      } else {
        setRequestErrorMessage(
          "Please check that you've entered valid matching passwords."
        );
      }
    } else {
      setRequestErrorMessage("Request cannot be completed");
    }
  };

  return (
    <div className="Password-recovery-claim__page">
      <header className="Password-recovery-request-page__header-bar">
        <Logo dark={true} />
        <h2 className="black-header-text">Recover password</h2>
      </header>
      { validRequestState === true &&
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
      }
      { validRequestState === true && 
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
      }
      {!validRequestState &&
        <div className="Password-recovery-claim__error-messages">
          <p className="Password-recovery-claim__error-messages-content"> {requestErrorMessage} </p>
        </div>
      }
      {claimSuccessful && (
        <div className="Password-recovery-claim-success">
          <p>
            {" "}
            Password successfully claimed. Please log in with your new
            credentials.
          </p>
        </div>  
      )}
    </div>
  );
}

export default RecoveryClaim;
