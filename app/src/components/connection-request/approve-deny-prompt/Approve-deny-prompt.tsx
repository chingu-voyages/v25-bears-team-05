import React from "react";
const connectionRequestIcon = (
  <svg
    className="connection-icon"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 12H7C7 9.61305 7.94821 7.32387 9.63604 5.63604C11.3239 3.94821 13.6131 3 16 3V5C12.13 5 9 8.13 9 12ZM16 9V7C13.24 7 11 9.24 11 12H13C13 10.34 14.34 9 16 9ZM5 2C5 0.89 4.11 0 3 0C1.89 0 1 0.89 1 2C1 3.11 1.89 4 3 4C4.11 4 5 3.11 5 2ZM9.45 2.5H7.45C7.33395 3.19855 6.97375 3.83324 6.43352 4.29106C5.8933 4.74888 5.20812 5.0001 4.5 5H1.5C0.67 5 0 5.67 0 6.5V9H6V6.74C6.92653 6.4478 7.7471 5.89047 8.36026 5.1369C8.97343 4.38333 9.35229 3.46658 9.45 2.5V2.5ZM17 15C18.11 15 19 14.11 19 13C19 11.89 18.11 11 17 11C15.89 11 15 11.89 15 13C15 14.11 15.89 15 17 15ZM18.5 16H15.5C14.7919 16.0001 14.1067 15.7489 13.5665 15.2911C13.0263 14.8332 12.666 14.1985 12.55 13.5H10.55C10.6477 14.4666 11.0266 15.3833 11.6397 16.1369C12.2529 16.8905 13.0735 17.4478 14 17.74V20H20V17.5C20 16.67 19.33 16 18.5 16Z"
      fill="white"
    />
  </svg>
);
const ApproveDenyPrompt = ({
  connectionUserName,
  approveButtonClicked,
  declineButtonClicked,
}: {
  connectionUserName: string;
  approveButtonClicked: () => void;
  declineButtonClicked: () => void;
}) => {
  const handleApproveButtonClicked = () => {
    approveButtonClicked();
  };

  const handleDeclineButtonClicked = () => {
    declineButtonClicked();
  };
  return (
    <div className="ConnectionRequestMenu__main-body">
      <div className="ConnectionRequestMenu__header">
        {connectionRequestIcon}
        <h4 className="ConnectionRequest__message">{`${connectionUserName} wants to connect`}</h4>
      </div>
      <div className="ConnectionRequestMenu__options-body">
        <h4 onClick={handleApproveButtonClicked} className="approve-option">
          Approve
        </h4>
        <h4 onClick={handleDeclineButtonClicked} className="decline-option">
          Decline
        </h4>
      </div>
    </div>
  );
};

export default ApproveDenyPrompt;
