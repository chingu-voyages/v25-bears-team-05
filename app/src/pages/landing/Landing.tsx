import React, { useEffect } from "react";
import Logo from "../../components/logo";
import Login from "../../components/login";
import Button from "../../components/button";
import { Link, useHistory } from "react-router-dom";
import featureGraphicSVG from "../../images/pairprograminggraphic.svg";
import "./Landing.css";

function Landing() {
  const history = useHistory();
  useEffect(() => {
    if (document.cookie?.match("synced-up-authed")) {
      // if authed cookie is set request auth
      if (!(history.location as any)?.state?.from?.match(/login|logout/)) {
        history.push("/login");
      }
    }
  }, []);

  return (
    <div className="Landing-page">
      <header className="Landing-page__header-bar">
        <Logo />
        <Link to="/signup">
          <Button className="square">Join now</Button>
        </Link>
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
