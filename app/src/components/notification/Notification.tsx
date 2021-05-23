import React, { useState } from "react";
import Avatar from "../avatar";
import ContextMenuButton from "./context-menu-button";
import "./notification-component-style.css";
import { INotificationCardData } from "./notification.types";

function NotificationElement(props: INotificationCardData) {
  const [timeAgo, setTimeAgo] = useState<string>("Just now");

  return (
    <div className="Notification__main-body">
      {!props.read && <div className="Notification-dot"></div>}
      <Avatar className="Notification__avatar square small" userName="test" />
      <div className="Notification__message-body">
        <div className="Notification__message_area">
          <h4
            className={`${
              !props.read ? "Message-style-unread" : "Message-style-read"
            }`}
          >
            {props.message}
          </h4>
        </div>
        <div className="Notification__time-ago">
          <h5 className="Notification__Time-ago-style">{timeAgo}</h5>
        </div>
      </div>
      <ContextMenuButton classNames="context-menu" />
    </div>
  );
}

export default NotificationElement;
