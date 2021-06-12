import React from "react";
import "./notification-context-menu-style.css";
import TrashIcon from "../../../images/trash-icon.svg";
import MuteIcon from "../../../images/mute-icon.svg";
import TurnOffIcon from "../../../images/turn-off-icon.svg";

const ToolTip = ({ text }: { text: string }) => (
  <div className="toolTip">
    <span className="toolTipText">{text}</span>
  </div>
);

function NotificationContextMenu({
  notificationId,
}: {
  notificationId: string;
}) {
  return (
    <div className="Notification-Context-menu__main-body">
      <div className="Notification-Context-menu-option">
        <img className="contextMenuIcon" src={TrashIcon} alt="delete"></img>
        <ToolTip text="Delete this notification" />
      </div>
      <div className="Notification-Context-menu-option">
        <img className="contextMenuIcon" src={MuteIcon} alt="mute"></img>
        <ToolTip text="Stop seeing notifications from this user" />
      </div>
      <div className="Notification-Context-menu-option">
        <img className="contextMenuIcon" src={TurnOffIcon} alt="turn off"></img>
        <ToolTip text="Stop seeing notifications like this" />
      </div>
    </div>
  );
}

export default NotificationContextMenu;
