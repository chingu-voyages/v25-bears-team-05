import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Landing from './pages/landing';
import Network from './pages/network';
import Profile from './pages/profile';
import Signup from './pages/signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/network">
          <Network />
        </Route>
        <Route path="/profile/:userId">
          <Profile />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
