import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  dismissNotificationAsync,
  markNotificationAsReadAsync,
  selectOpenMenus,
  setCloseContextMenu,
  setContextMenuOpen,
} from "../../pages/notifications/notificationSlice";

import Avatar from "../avatar";
import ContextMenuButton from "./context-menu-button";
import "./notification-component-style.css";
import { INotificationCardData } from "./notification.types";
import { useSwipeable } from "react-swipeable";
import NotificationContextMenu from "./context-menu";
import { NotificationContextMenuAction } from "./context-menu/Notification-context-menu";

function NotificationElement(props: INotificationCardData) {
  const dispatch = useDispatch();
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [swipingObject, setSwipingObject] = useState<any>();
  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const handleOnLinkClick = (notificationId: string) => {
    dispatch(markNotificationAsReadAsync(notificationId));
  };
  const openMenus = useSelector(selectOpenMenus, shallowEqual);

  useEffect(() => {
    if (swipingObject) {
      swipingObject.animate(
        [{ transform: "translateX(0px)" }, { transform: "translateX(-500px)" }],
        { duration: 400 }
      );
      swipingObject.style["margin-left"] = `-1300px`;
      if (props.id) {
        dispatch(dismissNotificationAsync(props.id));
        setIsSwiping(false);
      }
    }
  }, [dispatch, swipingObject, props.id]);

  const swipeHandlers = useSwipeable({
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
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

  const clickedInMenuRef = useRef(false);

  useEffect(() => {
    const handleClose = () => {
      if (!clickedInMenuRef.current) {
        setContextMenuVisible(false);
        dispatch(setCloseContextMenu(props.id));
      } else {
        clickedInMenuRef.current = false;
        window?.addEventListener("click", handleClose, { once: true });
      }
    };
    if (contextMenuVisible) {
      window?.addEventListener("click", handleClose, { once: true });
    }
    return () => {
      // openedMenus.current = {[props.id]: false}
      window?.removeEventListener("click", handleClose);
    };
  }, [contextMenuVisible]);

  const handleContextMenuClick = () => {
    if (openMenus && openMenus.length === 0) {
      clickedInMenuRef.current = true;
      setContextMenuVisible(true);
      dispatch(setContextMenuOpen(props.id));
    }
  };

  const contextMenuOptionClickHandler = (
    notificationId: string,
    action: NotificationContextMenuAction
  ) => {
    dispatch(setCloseContextMenu(props.id));
    setContextMenuVisible(false);
    switch (action) {
      case NotificationContextMenuAction.DELETE:
        dispatch(dismissNotificationAsync(props.id));
        break;
      case NotificationContextMenuAction.MUTE:
        console.log("Not yet implemented");
        break;
      case NotificationContextMenuAction.TURN_OFF:
        console.log("Not yet implemented");
        break;
    }
  };

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

      <ContextMenuButton
        className="context-menu"
        clickHandler={handleContextMenuClick}
      >
        {contextMenuVisible && (
          <NotificationContextMenu
            notification={props}
            onMenuOptionClicked={contextMenuOptionClickHandler}
          />
        )}
      </ContextMenuButton>
    </div>
  );
}

export default NotificationElement;
