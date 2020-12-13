import React from "react";
import { IUserPatchRequest } from "../../services/user/user.type";

export default interface IProfileEditor {
  inputs: IUserPatchRequest;
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
