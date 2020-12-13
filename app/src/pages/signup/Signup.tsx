import React from "react";
import "./Signup.css";
import Logo from "../../components/logo";
import Register from "../../components/register";

function Signup() {
  return (
    <div className="wrapper__Signup-page">
      <div className="Signup-page">
        <header className="Signup-page__header">
          <Logo dark />
          <h1 className="Signup-page__tagline">
            Join SyncedUp now - it's free!
          </h1>
        </header>
        <main className="Signup-page__registration">
          <Register />
        </main>
      </div>
    </div>
  );
}

export default Signup;
