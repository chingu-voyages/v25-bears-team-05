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
import Thread from "./pages/thread";
import NotFound404 from "./pages/NotFound404";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const status = useSelector(selectAuthStatus, shallowEqual);
  const dispatch = useDispatch();
  const socket: any = useRef();
  const userInfo = useSelector(selectUserById("me"), shallowEqual);
  const onLoadPath = useRef(
    window?.location?.pathname &&
      !["/", "/signup"].includes(window.location.pathname)
      ? window.location.pathname
      : "/home"
  );

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
        socket.current.emit("myId", userInfo.id);
      });
      socket.current.on("notification", (data: any) => {
        handleNotificationData(data);
        dispatch(getNotificationsAsync());
      });
    }
  }, [socket.current]);

  const handleNotificationData = (data: any) => {
    // NOTIFICATION FROM SERVER
    console.log("App.tsx line 64", data); // Leave here for debugging purposes
    if (data.type === "connection_request_approved") {
      dispatch(getUsersAsync(["me"]));
    }
  };

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
          path="/thread/:threadId"
          allowed={isLoggedIn}
          component={Thread}
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
          redirectTo={onLoadPath.current}
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
          redirectTo={onLoadPath.current}
          exact
        />
        <Route path="/" component={NotFound404} />
      </Switch>
    </Router>
  );
}

export default App;
