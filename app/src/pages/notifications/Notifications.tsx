import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import NotificationElement from "../../components/notification";
import { INotificationCardData } from "../../components/notification/notification.types";
import Status from "../../components/status";
import TopBar from "../../components/topBar";
import { selectProfileStatus } from "../profile/profileSlice";
import "./notifications-style.css";
import { selectNotifications } from "./notificationSlice";
function Notifications() {
  const status = useSelector(selectProfileStatus, shallowEqual);
  const notifications = useSelector(selectNotifications, shallowEqual);
  return (
    <div className="Notifications-page">
      <Status status={status} />
      <TopBar />
      <main className="Notifications-page__main">
        <section className="Notifications-container">
          {notifications &&
            notifications.map((notification: INotificationCardData) => (
              <NotificationElement
                {...{
                  id: notification.id,
                  message: notification.message,
                  read: notification.read,
                }}
              />
            ))}
        </section>
      </main>
    </div>
  );
}

export default Notifications;
