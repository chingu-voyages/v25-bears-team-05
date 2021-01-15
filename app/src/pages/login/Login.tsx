import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/spinner";
import { setIsLoggedIn } from "../../redux/actions/session";
import checkIfAuthed from "../../services/checkIfAuthed";

function Login({ setIsLoggedIn }) {
  useEffect(() => {
    (async () => {
      const isAuthed = await checkIfAuthed();
      setIsLoggedIn(isAuthed);
      // if undefined show error
      // if false redirect to logout
      // if true redirect to root
    })();
  }, []);

  return (
    <div>
      <Spinner message="Checking authenication" />
    </div>
  );
}

export default connect(null, { setIsLoggedIn })(Login);
