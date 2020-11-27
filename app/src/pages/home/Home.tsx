import React from "react";
import Button from "../../components/button";
import logout from "../../services/logout";
import "./Home.css";

function Home() {
  return (
    <div className="Home-page">
      <h1>Home page - TODO</h1>
      <Button onClick={logout} className="square">
        Temporary logout button
      </Button>
    </div>
  );
}

export default Home;
