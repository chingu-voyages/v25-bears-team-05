import React from "react";
import { IUserPatch } from "../../services/user/user.type";

export default interface IProfileEditor {
  inputs: IUserPatch;
  setInputs: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      jobTitle: string;
    }>
  >;
  errorMessage: string;
  className: string;
}
