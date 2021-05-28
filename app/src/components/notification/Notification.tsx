import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { markNotificationAsReadAsync } from "../../pages/notifications/notificationSlice";

import Avatar from "../avatar";
import ContextMenuButton from "./context-menu-button";
import "./notification-component-style.css";
import { INotificationCardData } from "./notification.types";

function NotificationElement(props: INotificationCardData) {
  const dispatch = useDispatch();

  const handleOnLinkClick = (notificationId: string) => {
    // Here we need to mark the notification as read
    dispatch(markNotificationAsReadAsync(notificationId));
  };
  return (
    <div className="Notification__main-body">
      {!props.read && <div className="Notification-dot"></div>}
      <Avatar className="Notification__avatar square small" userName="test" />
      <div className="Notification__message-body">
        <div className="Notification__message_area">
          <Link
            onClick={() => handleOnLinkClick(props.id)}
            className="Notification__link"
            to={`/${props.link}/profile`}
          >
            <h4 className={`${!props.read ? "unread" : "read"}`}>
              {props.message}
            </h4>
          </Link>
        </div>
        <div className="Notification__time-ago">
          <h5
            className={`Notification__Time-ago-style ${
              !props.read ? "unread" : "read"
            }`}
          >
            {props.timeAgo}
          </h5>
        </div>
      </div>

      <ContextMenuButton classNames="context-menu" />
    </div>
  );
}

export default NotificationElement;
