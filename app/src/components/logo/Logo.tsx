import React from "react";
import LogoSVG from "../../images/logo.svg";
import LogoDarkSGV from "../../images/logodark.svg";
import LogoCondensedSVG from "../../images/logocondensed.svg";
import "./Logo.css";
import { Link } from "react-router-dom";

function Logo({
  condensed,
  dark,
  className,
}: {
  condensed?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const svg = condensed ? LogoCondensedSVG : dark ? LogoDarkSGV : LogoSVG;
  return (
    <div className="wrapper__Logo">
      <Link to="/">
        <img
          className={`Logo ${condensed ? "Logo--condensed" : ""} ${
            className || ""
          }`}
          src={svg}
          alt="SyncedUp"
        />
      </Link>
    </div>
  );
}

export default Logo;
