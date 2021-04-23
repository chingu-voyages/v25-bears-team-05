import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/home";
import Landing from "./pages/landing";
import Network from "./pages/network";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import Login from "./pages/login";
import Loading from "./pages/loading";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIsAuthedAsync,
  selectAuthStatus,
  selectIsLoggedIn,
} from "./appSlice";
import PasswordRecovery from "./pages/password-recovery";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectAuthStatus);
  const dispatch = useDispatch();

  // On first load check if authed
  useEffect(() => {
    dispatch(checkIsAuthedAsync());
  }, [dispatch, isLoggedIn]);

  return status !== "idle" ? (
    <Loading message={status} />
  ) : (
    <Router>
      <Switch>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route
          path="/request-password-reset"
          component={PasswordRecovery}
        ></Route>
        <ProtectedRoute
          path="/:userId/network"
          allowed={isLoggedIn}
          component={Network}
          redirectTo="/"
        />
        <ProtectedRoute
          path="/:userId/profile"
          allowed={isLoggedIn}
          component={Profile}
          redirectTo="/"
        />
        <ProtectedRoute
          path="/home"
          allowed={isLoggedIn}
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

export default App;
