import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  logoutAsync,
  selectAuthStatus,
  selectIsLoggedIn,
} from "../../appSlice";
import Spinner from "../../components/spinner";

function Logout() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
