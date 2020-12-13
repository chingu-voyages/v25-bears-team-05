import React from "react";
import { Route, Redirect } from "react-router-dom";

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
  return (
    <Route
      {...rest}
      render={(props) => {
        if (allowed) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: redirectTo,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
