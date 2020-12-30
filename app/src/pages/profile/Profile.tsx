import React, { useEffect, useState, useRef } from "react";
import "./Profile.css";
import { useRouteMatch } from "react-router-dom";
import wallpaper from "../../images/profilewallpapergraphic.svg";
import Avatar from "../../components/avatar";
import editIcon from "../../images/editicon.svg";
import Button from "../../components/button";
import { updateUser, getUser } from "../../services/user";
import {
  IUserPatchRequest,
  IUserProcessed,
} from "../../services/user/user.type";
import ProfileCard from "../../components/profileCard";
import ProfileEditor from "../../components/profileEditor";
import PhotoUploader from "../../components/photoUploader";
import Nav from "../../components/nav";
import TopBar from "../../components/topBar";

function Profile() {
  const match: any = useRouteMatch("/:userId");
  const [userId, setUserId] = useState(match.params.userId.toLowerCase());
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

  useEffect(() => {
    setUserId(match.params.userId.toLowerCase())
  }, [match.params.userId])

  const handleUpdateInfo = () => {
    const onSuccess = (newData: IUserPatchRequest) => {
      setUserInfo((oldData) => ({ ...oldData, ...newData }));
      handleToggleEditMode();
    };
    const inputsHaveChanged = Object.entries(inputs).some(
      ([key, value]) => value !== ((userInfo as unknown) as any)[key]
    );
    if (inputsHaveChanged) {
      updateUser({ data: inputs, onSuccess, onError: setEditorErrorMessage });
    } else {
      handleToggleEditMode();
    }
  };

  useEffect(() => {
    const onSuccess = (newData: IUserProcessed) => {
      const {
        nOfConnections,
        firstName,
        lastName,
        jobTitle,
        avatar,
      } = newData;
      setUserInfo((oldData) => ({
        ...oldData,
        firstName,
        lastName,
        jobTitle: jobTitle,
      }));
      setNOfConnections(nOfConnections);
      setAvatar(avatar?.[0]?.url || "");
    };
    getUser({
      userId,
      onSuccess,
      onError: setGetDataErrorMessage,
    });
  }, []);
  return (
    <div className="Profile-page">
      <TopBar />
      <main className="Profile-page__profile">
        <div className="wrapper__Profile-page__wall-paper">
          <img className="Profile-page__wall-paper" src={wallpaper} alt="" />
        </div>
        <figure className="Profile-page__avatar">
          <PhotoUploader
            route={{
              url: "/api/users/me",
              method: "patch",
              urlPropertyName: "avatar",
            }}
            onUpload={(url) => setAvatar(url)}
          >
            <Avatar
              url={avatar}
              userName={
                `${userInfo.firstName} ${userInfo.lastName}`.trim() ||
                "user avatar"
              }
            />
          </PhotoUploader>
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
              type="profile" 
              data={{ ...userInfo, id: userId, nOfConnections }}
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
      <Nav />
    </div>
  );
}

export default Profile;
