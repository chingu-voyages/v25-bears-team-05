import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/spinner";
import { setIsLoggedIn } from "../../redux/actions/session";
import logout from "../../services/logout";

function Logout({ setIsLoggedIn }) {
  useEffect(() => {
    async () => {
      await logout();
      setIsLoggedIn(false);
      // redirect to root
    };
  }, []);
  return (
    <div>
      <Spinner message="Signing out" />
    </div>
  );
}

export default connect(null, { setIsLoggedIn })(Logout);
