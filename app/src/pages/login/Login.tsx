import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/spinner";
import { addErrorMessage } from "../../redux/actions/dialog";
import { setIsLoggedIn } from "../../redux/actions/session";
import { getAppStartUrlPath } from "../../redux/selectors";
import checkIfAuthed from "../../services/checkIfAuthed";
import "./Login.css";

function Login({ appStartUrl, setIsLoggedIn, addErrorMessage }: any) {
  const history = useHistory();
  useEffect(() => {
    (async () => {
      let isAuthed;
      try {
        isAuthed = await checkIfAuthed();
        setIsLoggedIn(isAuthed);
      } finally {
        if (!isAuthed) {
          // if undefined show error
          isAuthed !== false &&
            addErrorMessage("Sorry unable to login, please try later");
          history.push("/logout");
        } else {
          document.cookie = `synced-up-authed=${Date.now()}`;
          let pathname;
          if (appStartUrl && !appStartUrl.match("login")) {
            pathname = appStartUrl;
          } else {
            pathname = "/";
          }
          history.push({
            pathname,
            state: {
              from: "/login",
            },
          });
        }
      }
    })();
  }, [appStartUrl, setIsLoggedIn, addErrorMessage]);

  useEffect(() => {
    console.count("login history call");
  }, [history]);

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

export default connect(mapStateToProps, { setIsLoggedIn, addErrorMessage })(
  Login
);
