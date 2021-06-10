import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  dismissNotificationAsync,
  markNotificationAsReadAsync,
} from "../../pages/notifications/notificationSlice";

import Avatar from "../avatar";
import ContextMenuButton from "./context-menu-button";
import "./notification-component-style.css";
import { INotificationCardData } from "./notification.types";
import { useSwipeable } from "react-swipeable";

function NotificationElement(props: INotificationCardData) {
  const dispatch = useDispatch();
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [swipingObject, setSwipingObject] = useState<any>();
  const handleOnLinkClick = (notificationId: string) => {
    dispatch(markNotificationAsReadAsync(notificationId));
  };

  useEffect(() => {
    if (swipingObject) {
      swipingObject.animate(
        [{ transform: "translateX(0px)" }, { transform: "translateX(-500px)" }],
        { duration: 400 }
      );
      swipingObject.style["margin-left"] = `-1300px`;
      setIsSwiping(false);
    }
  }, [isSwiping]);

  const swipeHandlers = useSwipeable({
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    onSwipedLeft: (data: any) => {
      if (!isSwiping && data.velocity < 1) {
        data.event.currentTarget.style["margin-left"] = `0px`;
      }
    },
    onSwiping: (data: any) => {
      const target = data.event.currentTarget;
      if (target && target.style) {
        setSwipingObject(target);
        if (data.dir === "Left") {
          target.style["margin-left"] = `${data.deltaX}px`;
          if (data.velocity > 1) {
            setIsSwiping(true);
          }
        }
      }
    },
    trackTouch: true,
  });
  return (
    <div {...swipeHandlers} className="Notification__main-body">
      {!props.read && <div className="Notification-dot"></div>}
      <Avatar className="Notification__avatar square small" userName="test" />
      <div className="Notification__message-body">
        <div className="Notification__message_area">
          <Link
            onClick={(e: any) => {
              handleOnLinkClick(props.id);
            }}
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
      <ContextMenuButton className="context-menu" />
    </div>
  );
}

export default NotificationElement;
