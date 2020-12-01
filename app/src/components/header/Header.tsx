import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="navigationGroup">
      <div>
        <span>
          <img
            width="120px"
            height="30px"
            src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1606840733/logo_gymod2.png"
          />
        </span>
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

export default Header;
