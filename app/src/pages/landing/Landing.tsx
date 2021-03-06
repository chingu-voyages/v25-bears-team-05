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
      <header className="Landing-page__header-bar">
        <Logo />
        <Button className="square">
          <Link to="/signup">Join now</Link>
        </Button>
      </header>
      <main className="Landing-page__main">
        <h1 className="Landing-page__tagline">
          Welcome to your developer community
        </h1>
        <Login className="Landing-page__login" />
        <figure className="wrapper__Landing-page__feature-graphic">
          <img
            className="Landing-page__feature-graphic"
            src={featureGraphicSVG}
            alt=""
          />
        </figure>
      </main>
    </div>
  );
}

export default Landing;
