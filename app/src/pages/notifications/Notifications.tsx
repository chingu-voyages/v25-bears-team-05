import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import NotificationElement from "../../components/notification";
import Status from "../../components/status";
import TopBar from "../../components/topBar";
import convertDateStringToTimeAgo from "../../utils/convert-time-ago";
import { selectProfileStatus } from "../profile/profileSlice";
import "./notifications-style.css";
import { INotification, selectNotifications } from "./notificationSlice";
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
            notifications.map((notification: INotification) => (
              <NotificationElement
                {...{
                  id: notification._id,
                  message: notification.message,
                  read: notification.read,
                  link: notification.link,
                  timeAgo: convertDateStringToTimeAgo({
                    date: notification.createdAt,
                  }),
                }}
                key={notification._id}
              />
            ))}
          {notifications && notifications.length === 0 && (
            <div className="Notifications-empty-list">
              <h4>No notifications.</h4>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Notifications;
