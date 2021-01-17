import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/spinner";
import { setIsLoggedIn } from "../../redux/actions/session";
import logout from "../../services/logout";

function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const setIsAuthed = useCallback(
    (isAuthed) => dispatch(setIsLoggedIn(isAuthed)),
    [dispatch]
  );
  useEffect(() => {
    (async () => {
      await logout();
      console.log("set is authed to false");
      setIsAuthed(false);
      history.push("/");
    })();
  }, []);
  return (
    <div>
      <Spinner message="Signing out" />
    </div>
  );
}

export default Logout;
