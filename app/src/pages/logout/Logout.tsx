import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  logoutAsync,
  selectAuthStatus,
  selectIsLoggedIn,
} from "../../appSlice";
import Spinner from "../../components/spinner";

function Logout() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus, shallowEqual);
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  useEffect(() => {
    dispatch(logoutAsync());
  }, [dispatch]);
  return (
    <div>
      {status !== "idle" && <Spinner message={status} />}
      {status === "idle" && !isLoggedIn && <Redirect to="/" />}
    </div>
  );
}

export default Logout;
