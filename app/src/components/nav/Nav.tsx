import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import Avatar from "../avatar";
import OptionsMenu from "../optionsMenu";
import "./Nav.css";

function Nav({ className }: { className?: string }) {
  const history = useHistory();
  const pathname = history.location.pathname;
  const [page, setPage] = useState(
    pathname.match("network")
      ? "network"
      : history.location.hash.match("#newpost")
      ? "post"
      : pathname.match("home")
      ? "home"
      : pathname.match("me/profile")
      ? "profile"
      : ""
  );

  const [userInfo, setUserInfo] = useState<{
    url: string;
    firstName: string;
    lastName: string;
    id: string;
  }>();
  useEffect(() => {
    getCurrentUserInfo().then((userInfo) => {
      setUserInfo(userInfo);
      if (pathname.match(`${userInfo.id}/profile`)) {
        setPage("profile");
      }
    });
  }, []);
  return (
    <nav className={`Nav ${className || ""}`}>
      <Link to="/home" className={page === "home" ? "active" : ""}>
        <svg viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.3923 0L20.7846 7.5H19.9923V8.99998V16V18H17.9923H12.7923V18H12V12H9V18H7.99233V18H2.7923H0.792304V16V8.99998V7.5H0L10.3923 0ZM17.9923 16H12.7923V10.8H7.99233V16H2.7923V8.99998H3.19233V6.99998H3.22161L10.3923 1.74998L17.563 6.99998H17.5923V8.99998H17.9923V16Z"
          />
        </svg>
        Home
      </Link>
      <Link
        to="/home#newpost"
        className={`Nav__post ${page === "post" ? "active" : ""}`}
      >
        <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 23C18.299 23 23 18.299 23 12.5C23 6.70101 18.299 2 12.5 2C6.70101 2 2 6.70101 2 12.5C2 18.299 6.70101 23 12.5 23ZM12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM8 8H10V11H13V13H10V16H8V13H5V11H8V8ZM15 11V9H21V11H15ZM15 13V15H21V13H15Z"
          />
        </svg>
        Post
      </Link>
      <Link to="/me/network" className={page === "network" ? "active" : ""}>
        <svg viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.0711 17.0711C15.6725 18.4696 13.8907 19.422 11.9509 19.8079C10.0111 20.1937 8.00043 19.9957 6.17317 19.2388C4.3459 18.4819 2.78412 17.2002 1.6853 15.5557C0.58649 13.9112 0 11.9778 0 10C0 8.02219 0.586489 6.08879 1.6853 4.4443C2.78412 2.79981 4.3459 1.51809 6.17316 0.76121C8.00043 0.00433307 10.0111 -0.1937 11.9509 0.192151C13.8907 0.578003 15.6725 1.53041 17.0711 2.92894L10 10L17.0711 17.0711ZM11 4.99998C11 5.55226 10.5523 5.99998 10 5.99998C9.44771 5.99998 9 5.55226 9 4.99998C9 4.44769 9.44771 3.99998 10 3.99998C10.5523 3.99998 11 4.44769 11 4.99998ZM20 9.5C20 9.85675 19.8755 10.1844 19.6675 10.4419C19.9977 10.708 20.2415 11.0769 20.3504 11.5H20.4135V12V14H18.4135H16.4135V12V11.5H16.4765C16.5972 11.0309 16.8838 10.6285 17.2701 10.3589C17.0999 10.1156 17 9.81945 17 9.5C17 8.67157 17.6716 8 18.5 8C19.3284 8 20 8.67157 20 9.5Z"
          />
        </svg>
        My Network
      </Link>
      <OptionsMenu
        className={`Nav__avatar-menu ${page === "profile" ? "active" : ""}`}
        buttons={{
          "View Profile": { type: "link", linkTo: `/${userInfo?.id}/profile` },
          "Edit Profile": { type: "link", linkTo: "/me/profile" },
          Logout: {
            action: () => {
              history.push("/logout");
            },
            confirm: true,
          },
        }}
      >
        <>
          <Avatar
            size="xxsmall"
            url={userInfo?.url || ""}
            userName={
              userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ""
            }
          />
          Me
        </>
      </OptionsMenu>
    </nav>
  );
}

export default Nav;
