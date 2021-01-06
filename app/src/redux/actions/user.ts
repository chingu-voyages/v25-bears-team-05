import { IUserPatchRequest } from "../../services/user/user.type";
import { UPDATE_CURRENT_USER_INFO, UPDATE_USER } from "../actionTypes";

export const updateCurrentUserInfo = (userData: IUserPatchRequest) => ({
  type: UPDATE_CURRENT_USER_INFO,
  payload: {
    userData,
  },
});

export const updateUserById = (userData: IUserPatchRequest) => ({
  type: UPDATE_USER,
  payload: {
    userData,
  },
});
