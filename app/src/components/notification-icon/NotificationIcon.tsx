import React from "react";
import { normalIcon } from "./normal-icon";
import { alertIcon } from "./alert-icon";
import "./notificationIcon.css";
function NotificationIcon({
  notificationIndicatorOn,
}: {
  notificationIndicatorOn: boolean;
}) {
  return (
    <div className="Notification__icon">
      {notificationIndicatorOn === true ? alertIcon : normalIcon}
    </div>
  );
}

export default NotificationIcon;
