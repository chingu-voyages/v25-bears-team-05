import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/network">
          "Landing Page: TODO"
        </Route>
        <Route path="/profile/:userId">
          "Profile Page: TODO"
        </Route>
        <Route path="/home">
          "Home Page: TODO"
        </Route>
        <Route path="/signup">
          "Signup Page: TODO"
        </Route>
        <Route path="/">
          "Landing Page: TODO"
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
