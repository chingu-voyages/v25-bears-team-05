import { IUserPatchRequest } from "../../services/user/user.type";
import {
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  UPDATE_CURRENT_USER_INFO,
  UPDATE_USER,
} from "../actionTypes";

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

export const removeConnection = (connectionId: string) => ({
  type: REMOVE_CONNECTION,
  payload: {
    connectionId,
  },
});

export const addConnection = ({
  connectionId,
  isTeamMate,
}: {
  connectionId: string;
  isTeamMate: boolean;
}) => ({
  type: ADD_CONNECTION,
  payload: {
    connectionId,
    isTeamMate,
  },
});
