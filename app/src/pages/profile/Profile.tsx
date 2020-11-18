import React from 'react';
import './Profile.css';
import { useRouteMatch } from "react-router-dom";

function Profile() {
  const match: any = useRouteMatch('/profile/:userId');
  return (
    <div className="Profile-page">
      <h1>Profile page for {match.params.userId} - TODO</h1>
    </div>
  );
}

export default Profile;
