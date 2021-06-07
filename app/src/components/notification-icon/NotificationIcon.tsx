import React from "react";
import { normalIcon } from "./normal-icon";
import "./notificationIcon.css";
function NotificationIcon({ count }: { count: number }) {
  return (
    <div className="Notification__icon">
      {normalIcon}
      {count > 0 && (
        <span className="Notification__count">{count.toString()}</span>
      )}
    </div>
  );
}

export default NotificationIcon;
