import React from "react";
import { Route, useHistory } from "react-router-dom";
import Spinner from "../spinner";

const ProtectedRoute = ({
  component: Component,
  allowed,
  redirectTo,
  ...rest
}: {
  component: any;
  allowed: boolean;
  redirectTo: string;
  [keyof: string]: any;
}) => {
  const history = useHistory();
  if (!allowed) {
    history.push(redirectTo);
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (allowed) {
          return <Component {...rest} {...props} />;
        } else {
          return <Spinner message="Not Authorised" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
