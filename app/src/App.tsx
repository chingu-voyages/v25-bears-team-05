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
import Loading from "./pages/loading";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  checkIsAuthedAsync,
  selectAuthStatus,
  selectIsLoggedIn,
} from "./appSlice";
import Search from "./pages/search";
import PasswordRecovery from "./pages/password-recovery/recovery-request";
import RecoveryClaim from "./pages/password-recovery/recovery-claim";
import { getUsersAsync, selectUserById } from "./pages/profile/profileSlice";
import { getCookie } from "./utils/cookie";
import Notifications from "./pages/notifications";
import { getNotificationsAsync } from "./pages/notifications/notificationSlice";
import { io } from "socket.io-client";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const status = useSelector(selectAuthStatus, shallowEqual);
  const dispatch = useDispatch();
  const socket: any = useRef();
  const userInfo = useSelector(selectUserById("me"), shallowEqual);

  // On first load check if authed
  useEffect(() => {
    getCookie("has-existing-auth-cookie") === "true" &&
      dispatch(checkIsAuthedAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      socket.current = io("http://localhost:7000");
    }
  }, [userInfo]);
  // Once logged in get current user data
  useEffect(() => {
    isLoggedIn && dispatch(getUsersAsync(["me"]));
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("connect", () => {
        console.log("IO connected!");
        socket.current.emit("myId", userInfo.id);
        console.log("sending my info", userInfo.id);
      });
      socket.current.on("notification", (data: any) => {
        console.log("*** NOTIFICATION FROM SERVER ***", data);
        dispatch(getNotificationsAsync());
      });
    }
  }, [socket.current]);

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
        <Route path="/recover" component={RecoveryClaim} />
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
          path="/search/:query"
          allowed={isLoggedIn}
          component={Search}
          redirectTo="/"
        />
        <ProtectedRoute
          path="/notifications"
          allowed={isLoggedIn}
          component={Notifications}
          redirectTo="/"
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
