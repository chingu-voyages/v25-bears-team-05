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
import { useDispatch, useSelector } from "react-redux";
import { editCurrentUser, fetchUserData } from "../../redux/actions/users";
import { IStoreState } from "../../redux/store.type";

function Profile() {
  const match: any = useRouteMatch("/:userId");
  const userId = match.params.userId.toLowerCase();
  const userData = useSelector((state: IStoreState) => state.users[userId]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData(userId));
    }
  }, []);

  const [inputs, setInputs] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const handleToggleEditMode = () => {
    const editingMode = !isEditing;
    if (editingMode) {
      const inputValues = {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        jobTitle: userData?.jobTitle,
      };
      setInputs(inputValues);
    }
    setIsEditing(editingMode);
  };

  const handleUpdateInfo = () => {
    const inputsHaveChanged = Object.entries(inputs).some(
      ([key, value]) => value !== ((userData as unknown) as any)[key]
    );
    if (inputsHaveChanged) {
      dispatch(editCurrentUser({ ...inputs }));
    }
    handleToggleEditMode();
  };

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
            onUpload={(url) =>
              editCurrentUser({
                avatarUrls: [{ url }, ...userData.avatarUrls],
              })
            }
          >
            <Avatar userData={userData} />
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
              userData={userData}
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
