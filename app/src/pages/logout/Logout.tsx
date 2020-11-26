import React from "react";
import { Redirect } from "react-router-dom";

function Logout({ onLogout }: { onLogout: () => void }) {
  onLogout();
  return (
    <div>
      <h1>logging out</h1>
      <Redirect to="/" />
    </div>
  );
}

export default Logout;
