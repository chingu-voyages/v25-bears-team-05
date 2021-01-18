import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/home";
import Landing from "./pages/landing";
import Network from "./pages/network";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import Login from "./pages/login";
import { connect } from "react-redux";
import { getLoggedInState } from "./redux/selectors";
import { fetchUserData } from "./redux/actions/users";
import { setAppStartUrlPath } from "./redux/actions/session";

function App({ isLoggedIn, fetchUserData, setAppStartUrlPath }: any) {
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData("me");
    }
  }, [isLoggedIn, fetchUserData]);

  // Keep the url entered for login page to rediect to after auth
  const firstUrlPath = useRef(window.location.pathname);
  useEffect(() => {
    setAppStartUrlPath(firstUrlPath.current);
  }, [setAppStartUrlPath]);

  return (
    <Router>
      <Switch>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute
          path="/:userId/network"
          allowed={!!isLoggedIn}
          component={Network}
          redirectTo="/"
        />
        <ProtectedRoute
          path="/:userId/profile"
          allowed={!!isLoggedIn}
          component={Profile}
          redirectTo="/"
        />
        <ProtectedRoute
          path="/home"
          allowed={!!isLoggedIn}
          component={Home}
          redirectTo="/"
        />
        <ProtectedRoute
          path="/signup"
          allowed={!isLoggedIn}
          component={Signup}
          redirectTo="/home"
        />
        <ProtectedRoute
          path="/"
          allowed={!isLoggedIn}
          component={Landing}
          redirectTo="/home"
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: any) => {
  const isLoggedIn = getLoggedInState(state);
  return { isLoggedIn };
};

export default connect(mapStateToProps, { fetchUserData, setAppStartUrlPath })(
  App
);
