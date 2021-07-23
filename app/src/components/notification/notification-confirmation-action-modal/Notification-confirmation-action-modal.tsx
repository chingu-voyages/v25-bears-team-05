import React from "react";
import Button from "../../button";
import "./notification-confirmation-action-modal.css";
const NotificationConfirmationActionModal = ({
  onConfirm,
  onCancel,
  message,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}) => {
  return (
    <div className="Notification-action-confirmation__main">
      <div className="Notification-action-confirmation__body">
        <h4 className="align-center">{message}</h4>
        <div className="Notification-action-confirmation__options">
          <Button className="square" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="square primary" onClick={onConfirm}>
            {" "}
            Yes{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationConfirmationActionModal;
