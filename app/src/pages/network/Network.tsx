import React from "react";
import "./Network.css";
import backIcon from "../../images/backicon.svg";

function Network() {
  const history = useHistory();
  const handleGoBack = () => history.goBack();
  return (
    <div className="Network-page">
      <header className="Network-page__top-bar">
        <Button role="link" onClick={handleGoBack}>
          <img className="Network-page__back-icon" src={backIcon} alt="back" />
        </Button>
        <h1 className="Network-page__title">Connections</h1>
      </header>
    </div>
  );
}

export default Network;
