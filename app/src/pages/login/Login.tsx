import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import checkIfAuthed from "../../services/checkIfAuthed";

function Login({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    checkIfAuthed({ setDone: setIsLoggedIn });
  }, []);
  return (
    <div>
      <h1>logging in</h1>
      <Redirect to="/" />
    </div>
  );
}

export default Login;
