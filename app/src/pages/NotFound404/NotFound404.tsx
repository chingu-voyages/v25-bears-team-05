import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button";
import Logo from "../../components/logo";
import "./NotFound404.css";

function NotFound404() {
  return (
    <div className="Not-found-404-page">
      <Logo />
      <h1>Not found - 404</h1>
      <Button className="square">
        <Link to="/home">Go Home</Link>
      </Button>
    </div>
  );
}

export default NotFound404;
