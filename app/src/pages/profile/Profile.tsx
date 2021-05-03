import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useRouteMatch } from "react-router-dom";
import wallpaper from "../../images/profilewallpapergraphic.svg";
import Avatar from "../../components/avatar";
import editIcon from "../../images/editicon.svg";
import Button from "../../components/button";
import ProfileCard from "../../components/profileCard";
import ProfileEditor from "../../components/profileEditor";
import PhotoUploader from "../../components/photoUploader";
import Nav from "../../components/nav";
import TopBar from "../../components/topBar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getUsersAsync,
  selectProfileStatus,
  selectUserById,
  updateAvatarURL,
  updateProfileAsync,
} from "./profileSlice";
import Status from "../../components/status";

function Profile() {
  const status = useSelector(selectProfileStatus, shallowEqual);
  const match: any = useRouteMatch("/:userId");
  const userId = match.params.userId.toLowerCase();
  const userInfo = useSelector(selectUserById(userId), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAsync([match.params.userId.toLowerCase()]));
  }, [match.params.userId]);

  const getUserDataForInputs = () => {
    return {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      jobTitle: userInfo?.jobTitle,
    };
  };
  const [inputs, setInputs] = useState(getUserDataForInputs());
  const [isEditing, setIsEditing] = useState(false);
  const handleToggleEditMode = () => {
    const editingMode = !isEditing;
    if (editingMode) {
      setInputs(getUserDataForInputs());
    }
    setIsEditing(editingMode);
  };
  const handleUpdateInfo = () => {
    const inputsHaveChanged = Object.entries(inputs).some(
      ([key, value]) => value !== ((userInfo as unknown) as any)[key]
    );
    inputsHaveChanged && dispatch(updateProfileAsync(inputs));
    handleToggleEditMode();
  };

  return (
    <div className="Profile-page">
      <Status status={status} />
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
            onUpload={(url) => dispatch(updateAvatarURL(url))}
          >
            <Avatar
              url={userInfo?.avatar?.[0]?.url || ""}
              userName={
                `${userInfo?.firstName} ${userInfo?.lastName}`.trim() ||
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
              {...{ inputs, setInputs }}
              className="Profile-page__editor"
            />
          ) : (
            <ProfileCard
              type="profile"
              userId={userId}
              className="Profile-page__info__text"
            />
          )}
        </div>
      </main>
      <Nav />
    </div>
  );
}

export default Profile;
