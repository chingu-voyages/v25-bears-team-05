import React, { useState } from "react";
import "./Profile.css";
import { useRouteMatch } from "react-router-dom";
import wallpaper from "../../images/profilewallpapergraphic.svg";
import Avatar from "../../components/avatar";
import editIcon from "../../images/editicon.svg";
import Button from "../../components/button";
import { updateUser } from "../../services/user";
import { IUserProcessed } from "../../services/user/user.type";
import ProfileCard from "../../components/profileCard";
import ProfileEditor from "../../components/profileEditor";
import PhotoUploader from "../../components/photoUploader";
import Nav from "../../components/nav";
import TopBar from "../../components/topBar";
import { connect } from "react-redux";
import { updateCurrentUserInfo } from "../../redux/actions/users";

function Profile({ users }: { users: { [keyof: string]: IUserProcessed } }) {
  const match: any = useRouteMatch("/:userId");
  const urlIdParam = match.params.userId.toLowerCase();
  const userId = urlIdParam;
  const [editorErrorMessage, setEditorErrorMessage] = useState("");

  const [inputs, setInputs] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const handleToggleEditMode = () => {
    const editingMode = !isEditing;
    if (editingMode) {
      const inputValues = {
        firstName: users?.[userId]?.firstName,
        lastName: users?.[userId]?.lastName,
        jobTitle: users?.[userId]?.jobTitle,
      };
      setInputs(inputValues);
    }
    setIsEditing(editingMode);
  };

  const handleUpdateInfo = () => {
    const onSuccess = () => {
      handleToggleEditMode();
    };
    const inputsHaveChanged = Object.entries(inputs).some(
      ([key, value]) => value !== ((users?.[userId] as unknown) as any)[key]
    );
    if (inputsHaveChanged) {
      updateUser({ data: inputs, onSuccess, onError: setEditorErrorMessage });
    } else {
      handleToggleEditMode();
    }
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
              updateCurrentUserInfo({
                avatar: [{ url }, ...users?.[userId]?.avatar],
              })
            }
          >
            <Avatar userId={userId} />
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

const mapStateToProps = (state: any) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps, { updateCurrentUserInfo })(Profile);
