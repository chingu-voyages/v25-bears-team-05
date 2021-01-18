import React, { useCallback, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/spinner";
import { addErrorMessage } from "../../redux/actions/dialog";
import { setIsLoggedIn } from "../../redux/actions/session";
import { getAppStartUrlPath } from "../../redux/selectors";
import checkIfAuthed from "../../services/checkIfAuthed";
import "./Login.css";

function Login({ appStartUrl }: { appStartUrl?: string }) {
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
        document.cookie = `synced-up-authed=${Date.now()}`;
        if (appStartUrl && !appStartUrl.match("login")) {
          history.push(appStartUrl);
        } else {
          history.push("/");
        }
      }
    })();
  }, []);

  return (
    <div className="Login-page">
      <Spinner
        className="Login-page__spinner"
        message="Checking authenication"
      />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const appStartUrl = getAppStartUrlPath(state);
  return { appStartUrl };
};

export default connect(mapStateToProps)(Login);
