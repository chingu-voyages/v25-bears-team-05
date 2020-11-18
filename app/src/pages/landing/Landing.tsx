import React from "react";
import Logo from "../../components/logo";
import Login from "../../components/login";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import featureGraphicSVG from "../../images/pairprograminggraphic.svg";
import "./Landing.css";

function Landing() {
  return (
    <div className="Landing-page">
      <header>
        <Logo />
        <Button className="square primary green-border">
          <Link to="/signup">Join now</Link>
        </Button>
      </header>
      <main>
        <h1>Landing - TODO</h1>
        <Login />
        <figure>
          <img src={featureGraphicSVG} alt="" />
        </figure>
      </main>
    </div>
  );
}

export default Landing;
