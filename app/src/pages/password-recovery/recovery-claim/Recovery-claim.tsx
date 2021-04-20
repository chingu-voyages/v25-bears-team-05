import React from "react";
import "./recovery-claim.css";
import { useLocation } from "react-router-dom";
import { parseIdParameter } from "../utils/parse-id-parameter";
import assert from "assert";

function RecoveryClaim() {
  const search = useLocation().search;
  const parseResult = parseIdParameter({ fullQueryString: search });
  const id = new URLSearchParams(search).get("id")?.replace(" ", "+");
  const data = new URLSearchParams(search).get("data");

  /* URLSearchParams replaces the '+' symbol with spaces. This assert is
    to ensure that the parseResult and the .replace(" ", "+") method call
    return identical values
  */
  assert(id === parseResult, "id parameter query string mismatch");

  return (
    <div>
      <p> This is the recovery claim page </p>
    </div>
  );
}

export default RecoveryClaim;
