import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/home";
import Landing from "./pages/landing";
import Network from "./pages/network";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import checkIfAuthed from "./services/checkIfAuthed";
import Logout from "./pages/logout";
import Login from "./pages/login";
import Loading from "./pages/loading";
import PasswordRecovery from "./pages/password-recovery/recovery-request";
import RecoveryClaim from "./pages/password-recovery/recovery-claim";

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkIfAuthed({
      setDone: (authed: boolean) => {
        setIsLoggedIn(authed);
        setAuthChecked(true);
      },
    });
  }, []);
  return !authChecked ? (
    <Loading message="Checking auth" />
  ) : (
    <Router>
      <Switch>
        <Route path="/logout">
          <Logout onLogout={() => setIsLoggedIn(false)} />
        </Route>
        <Route path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} />
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
