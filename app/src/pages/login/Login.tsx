import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  checkIsAuthedAsync,
  selectAuthStatus,
  selectIsLoggedIn,
} from "../../appSlice";
import Spinner from "../status/components/spinner";

function Login() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus, shallowEqual);
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  useEffect(() => {
    dispatch(checkIsAuthedAsync());
  }, [dispatch]);
  return (
    <div>
      {status !== "idle" && <Spinner message={status} />}
      {status === "idle" && isLoggedIn && <Redirect to="/" />}
    </div>
  );
}

export default Login;
