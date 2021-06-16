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
import NotificationActionConfirmation from "./notification-confirmation-action-modal";

function NotificationElement(props: INotificationCardData) {
  const dispatch = useDispatch();
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [swipingObject, setSwipingObject] = useState<any>();
  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [
    confirmationAction,
    setConfirmationAction,
  ] = useState<NotificationContextMenuAction | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  const handleOnLinkClick = (notificationId: string) => {
    dispatch(markNotificationAsReadAsync(notificationId));
  };
  const openMenus = useSelector(selectOpenMenus, shallowEqual);

  useEffect(() => {
    if (swipingObject) {
      swipingObject.style["margin-left"] = `-1300px`;
      if (props.id && isSwiping) {
        dispatch(dismissNotificationAsync(props.id));
        setIsSwiping(false);
      }
    }
  }, [dispatch, swipingObject, props.id, isSwiping]);

  const swipeHandlers = useSwipeable({
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
    onSwipedLeft: (data: any) => {
      if (!isSwiping && data.velocity < 1) {
        if (data.event.currentTarget) {
          data.event.currentTarget.style["margin-left"] = `0px`;
        }
      }
    },
    onSwiping: (data: any) => {
      const target = data.event.currentTarget;
      if (target && target.style) {
        setSwipingObject(target);
        if (data.dir === "Left" && data.velocity > 1) {
          target.style["margin-left"] = `${data.deltaX}px`;
          setIsSwiping(true);
        }
      }
    },
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
        setConfirmationAction(NotificationContextMenuAction.DELETE);
        setShowConfirmation(true);
        setConfirmationMessage("Confirm delete");
        break;
      case NotificationContextMenuAction.MUTE:
      case NotificationContextMenuAction.TURN_OFF:
        //setConfirmationAction(NotificationContextMenuAction.DELETE)
        console.log("Not yet implemented");
        break;
    }
  };

  const handleConfirmationAction = (
    action: NotificationContextMenuAction | null
  ) => {
    switch (action) {
      case NotificationContextMenuAction.DELETE:
        setShowConfirmation(false);
        setConfirmationMessage("");
        setConfirmationAction(null);
        deleteNotificationAction();
        break;
      default:
        console.log("Not implemented");
    }
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
    setConfirmationMessage("");
    setConfirmationAction(null);
  };

  const deleteNotificationAction = () =>
    dispatch(dismissNotificationAsync(props.id));

  return (
    <div className="Notification__main__parent">
      {showConfirmation &&
        NotificationActionConfirmation({
          onCancel: handleCancelAction,
          onConfirm: () => handleConfirmationAction(confirmationAction),
          message: confirmationMessage,
        })}
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
              <h4
                className={`${
                  !props.read ? "unread" : "read"
                } Notification__message-text`}
              >
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
    </div>
  );
}

export default NotificationElement;
