import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useRouteMatch } from "react-router-dom";
import wallpaper from "../../images/profilewallpapergraphic.svg";
import Avatar from "../../components/avatar";
import editIcon from "../../images/editicon.svg";
import Button from "../../components/button";
import { updateUser, getUser } from "../../services/user";
import IUser, { IUserPatch } from "../../types/user.type";
import ProfileCard from "../../components/profileCard";
import ProfileEditor from "../../components/profileEditor";

function Profile() {
  const match: any = useRouteMatch("/profile/:userId");
  const userId = match.params.userId.toLowerCase();
  const [nOfConnections, setNOfConnections]: [
    number | null,
    React.Dispatch<React.SetStateAction<any>>
  ] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [getDataErrorMessage, setGetDataErrorMessage] = useState("");
  const [editorErrorMessage, setEditorErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
  });
  const [inputs, setInputs] = useState(userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const handleToggleEditMode = () => {
    const editingMode = !isEditing;
    if (editingMode) {
      setInputs(userInfo);
    }
    setIsEditing(editingMode);
  };

  const handleUpdateInfo = () => {
    const onSuccess = (newData: IUserPatch) => {
      setUserInfo((oldData) => ({ ...oldData, ...newData }));
      handleToggleEditMode();
    };
    updateUser({ data: inputs, onSuccess, onError: setEditorErrorMessage });
  };

  useEffect(() => {
    const onSuccess = (newData: IUser) => {
      const { nOfConnections } = newData;
      setUserInfo((oldData) => ({ ...oldData, ...newData }));
      setNOfConnections(nOfConnections);
    };
    getUser({ userId, onSuccess, onError: setGetDataErrorMessage });
  }, []);
  return (
    <div className="Profile-page">
      <header className="Profile-page__header"></header>
      <main className="Profile-page__profile">
        <div className="wrapper__Profile-page__wall-paper">
          <img className="Profile-page__wall-paper" src={wallpaper} alt="" />
        </div>
        <figure className="Profile-page__avatar">
          <Avatar
            url={avatar}
            userName={
              `${userInfo.firstName} ${userInfo.lastName}`.trim() ||
              "user avatar"
            }
          />
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
            <ProfileEditor
              {...{ inputs, setInputs, errorMessage: editorErrorMessage }}
              className="Profile-page__editor"
            />
          ) : (
            <ProfileCard
              profileInfo={{ ...userInfo, nOfConnections, avatar }}
              className="Profile-page__info__text"
            />
          )}
          {getDataErrorMessage && (
            <p className="Profile-page__get-data-error">
              {getDataErrorMessage}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
