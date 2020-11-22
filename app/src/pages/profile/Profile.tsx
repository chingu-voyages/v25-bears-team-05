import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useRouteMatch } from "react-router-dom";
import wallpaper from "../../images/profilewallpapergraphic.svg";
import Avatar from "../../components/avatar";
import editIcon from "../../images/editicon.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import axios from "axios";

function Profile() {
  const match: any = useRouteMatch("/profile/:userId");
  const userId = match.params.userId.toLowerCase();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
  });
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setlastNameInput] = useState("");
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [nConnections, setNConnections] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleToggleEditMode = () => {
    const editingMode = !isEditing;
    if (editingMode) {
      setFirstNameInput(userInfo.firstName);
      setlastNameInput(userInfo.lastName);
      setJobTitleInput(userInfo.jobTitle);
    }
    setIsEditing(editingMode);
  };
  const handleUpdateInfo = async () => {
    const newUserInfo = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      jobTitle: jobTitleInput,
    };
    let req;
    let reqError;
    try {
      req = await axios({
        method: "patch",
        url: `user/${userId}`,
        data: newUserInfo,
      });
    } catch (error) {
      console.error(error);
      reqError = error;
    } finally {
      typeof reqError?.message === "string" &&
        setErrorMessage(reqError.message);
    }
    if (!reqError) {
      setUserInfo(newUserInfo);
      handleToggleEditMode();
    }
  };
  const getUserName = () =>
    `${userInfo.firstName} ${userInfo.lastName}`.trim() || "... ...";

  useEffect(() => {
    (async () => {
      try {
        const res = await axios("/user/me");
        const { firstName, lastName, jobTitle, numberOfConnections } = res.data;
        setUserInfo((userInfo) => ({
          ...userInfo,
          firstName,
          lastName,
          jobTitle,
        }));
        setNConnections((oldN) => numberOfConnections || oldN);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className="Profile-page">
      <header className="Profile-page__header"></header>
      <main className="Profile-page__profile">
        <div className="wrapper__Profile-page__wall-paper">
          <img className="Profile-page__wall-paper" src={wallpaper} alt="" />
        </div>
        <figure className="Profile-page__avatar">
          <Avatar userName={getUserName()} />
        </figure>
        <div className="Profile-page__info">
          {userId === "me" && (
            <>
              <Button
                onClick={handleToggleEditMode}
                className="Profile-page__info__edit"
              >
                <img src={editIcon} alt="edit" />
              </Button>
              {isEditing && (
                <Button
                  onClick={handleUpdateInfo}
                  className="Profile-page__info__save square"
                >
                  Save
                </Button>
              )}
            </>
          )}
          {isEditing ? (
            <div className="Profile-page__info__inputs">
              <Input
                label={"First name"}
                type="text"
                className="Profile-page__inputs__first-name"
                id="ProfilePageFirstName"
                value={firstNameInput}
                setValue={setFirstNameInput}
                errorMessage={errorMessage}
                errorMessageReturner={() => null}
              />
              <Input
                label={"Last name"}
                type="text"
                className="Profile-page__inputs__last-name"
                id="ProfilePageLastName"
                value={lastNameInput}
                setValue={setlastNameInput}
                errorMessage={errorMessage}
                errorMessageReturner={() => null}
              />
              <Input
                label={"Job title"}
                type="text"
                className="Profile-page__inputs__job-title"
                id="ProfileJobTitle"
                value={jobTitleInput}
                setValue={setJobTitleInput}
                errorMessage={errorMessage}
              />
            </div>
          ) : (
            <div className="Profile-page__info__text">
              <h1 className="Profile-page__name">{getUserName()}</h1>
              <h2 className="Profile-page__job-title">
                {userInfo.jobTitle || "..."}
              </h2>
              <p className="Profile-page__connections-count">
                <Link to="/network">{nConnections || "..."} Connections</Link>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
