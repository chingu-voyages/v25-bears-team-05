import React from "react";
import Input from "../../components/input";
import IProfileEditor from "./ProfileEditor.type";
import "./ProfileEditor.css";

function ProfileEditor({
  inputs,
  setInputs,
  errorMessage,
  className,
}: IProfileEditor) {
  const handleSetInput = (key: string, value: string) => {
    setInputs((values: any) => ({ ...values, [key]: value }));
  };
  const handleSetFirstName = (name: string) => {
    handleSetInput("firstName", name);
  };
  const handleSetLastName = (name: string) => {
    handleSetInput("lastName", name);
  };
  const handleSetJobTitle = (title: string) => {
    handleSetInput("jobTitle", title);
  };

  return (
    <div className={`Profile-editor ${className}`}>
      <Input
        label={"First name"}
        type="text"
        className="Profile-editor__first-name"
        id="ProfilePageFirstName"
        value={inputs.firstName || ""}
        setValue={handleSetFirstName}
        errorMessage={errorMessage}
        errorMessageReturner={() => null}
      />
      <Input
        label={"Last name"}
        type="text"
        className="Profile-editor__last-name"
        id="ProfilePageLastName"
        value={inputs.lastName || ""}
        setValue={handleSetLastName}
        errorMessage={errorMessage}
        errorMessageReturner={() => null}
      />
      <Input
        label={"Job title"}
        type="text"
        className="Profile-editor__job-title"
        id="ProfileJobTitle"
        value={inputs.jobTitle || ""}
        setValue={handleSetJobTitle}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default ProfileEditor;
