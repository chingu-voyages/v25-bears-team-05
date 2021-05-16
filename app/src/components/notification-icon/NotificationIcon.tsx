import React from "react";
import { normalIcon } from "./normal-icon";
import { alertIcon } from "./alert-icon";

function NotificationIcon({
  notificationIndicatorOn,
}: {
  notificationIndicatorOn: boolean;
}) {
  return (
    <div>
      {notificationIndicatorOn ? alertIcon : normalIcon}
      Notifications
    </div>
  );
}

export default NotificationIcon;
