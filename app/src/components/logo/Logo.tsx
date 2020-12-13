import React from "react";
import LogoSVG from "../../images/logo.svg";
import LogoDarkSGV from "../../images/logodark.svg";
import LogoCondensedSVG from "../../images/logocondensed.svg";
import "./Logo.css";

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
      <img className={`Logo ${className}`} src={svg} alt="SyncedUp" />
    </div>
  );
}

export default Logo;
