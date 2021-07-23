import React from "react";
import { notificationIndicatorIcon } from "./notification-icon-indicator";
import "./notificationIcon.css";
function NotificationIcon({
  notificationCount,
}: {
  notificationCount: number;
}) {
  return (
    <div className="Notification__icon">
      {notificationIndicatorIcon}
      {notificationCount > 0 && (
        <span className="Notification__count">
          {notificationCount.toString()}
        </span>
      )}
    </div>
  );
}

export default NotificationIcon;
