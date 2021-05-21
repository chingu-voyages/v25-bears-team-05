import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import Status from "../../components/status";
import TopBar from "../../components/topBar";
import { selectProfileStatus } from "../profile/profileSlice";
import "./notifications-style.css";
function Notifications() {
  const status = useSelector(selectProfileStatus, shallowEqual);
  return (
    <div className="Notifications-page">
      <Status status={status} />
      <TopBar />
      <main className="Notifications-page__main">
        <section className="Notifications-container"></section>
      </main>
    </div>
  );
}

export default Notifications;
