import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/spinner";
import { addErrorMessage } from "../../redux/actions/dialog";
import { setIsLoggedIn } from "../../redux/actions/session";
import checkIfAuthed from "../../services/checkIfAuthed";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const setIsAuthed = useCallback(
    (isAuthed) => dispatch(setIsLoggedIn(isAuthed)),
    [dispatch]
  );
  const addErrorToDialog = useCallback(
    (message) => dispatch(addErrorMessage(message)),
    [dispatch]
  );
  useEffect(() => {
    (async () => {
      const isAuthed = await checkIfAuthed();
      setIsAuthed(isAuthed);
      if (!isAuthed) {
        // if undefined show error
        isAuthed !== false &&
          addErrorToDialog("Sorry unable to login, please try later");
        history.push("/logout");
      } else {
        history.push("/");
      }
    })();
  }, []);

  return (
    <div>
      <Spinner message="Checking authenication" />
    </div>
  );
}

export default Login;
