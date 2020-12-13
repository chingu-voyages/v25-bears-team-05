import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/spinner";
import logout from "../../services/logout";

function Logout({ onLogout }: { onLogout: () => void }) {
  useEffect(() => {
    onLogout();
    logout();
  }, []);
  return (
    <div>
      <Spinner message="logging out" />
      <Redirect to="/" />
    </div>
  );
}

export default Logout;
