import React from "react";
import Button from "../../components/button";
import logout from "../../services/logout";
import "./Home.css";

function Home() {
  return (
    <div className="navigationGroup">
      <div>
        <span>Logo</span>
      </div>
      <div>
        <input type="text" placeholder="Search" className="searchBar" />
      </div>
      <div>
        <span>Home</span>
      </div>
      <div>
        <span>My Network</span>
      </div>
      <div>
        <span>Me</span>
      </div>
    </div>
  );
}

export default Home;
