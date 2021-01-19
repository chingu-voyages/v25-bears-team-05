import { Dispatch } from "redux";
import {
  addConnection as addConnectionService,
  getUser,
  removeConnection as removeConnectionService,
  updateUser as updateUserService,
} from "../../services/user";
import { IUserPatch } from "../../services/user/user.type";
import {
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  UPDATE_CURRENT_USER_INFO,
  UPDATE_USER,
} from "../actionTypes";
import handleServiceRequest from "../handleServiceRequest";

export const editCurrentUser = (userData: IUserPatch) => {
  return async (dispatch: Dispatch) => {
    const res = await handleServiceRequest({
      requestFunction: updateUserService,
      requestProps: { data: userData },
    });
    res &&
      dispatch({
        type: UPDATE_CURRENT_USER_INFO,
        payload: {
          userData,
        },
      });
  };
};

export const updateUser = (userData: IUserPatch) => ({
  type: UPDATE_USER,
  payload: {
    userData,
  },
});

export const fetchUserData = (userId: string) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: getUser,
      requestProps: { userId },
    });
    resData && dispatch(updateUser(resData));
  };
};

export const removeConnection = (connectionId: string) => {
  return async (dispatch: Dispatch) => {
    const res = await handleServiceRequest({
      requestFunction: removeConnectionService,
      requestProps: {
        connectionId,
      },
    });
    res &&
      dispatch({
        type: REMOVE_CONNECTION,
        payload: {
          connectionId,
        },
      });
  };
};

export const addConnection = ({
  connectionId,
  isTeamMate,
}: {
  connectionId: string;
  isTeamMate: boolean;
}) => {
  return async (dispatch: Dispatch) => {
    const res = await handleServiceRequest({
      requestFunction: addConnectionService,
      requestProps: {
        connectionId,
        isTeamMate,
      },
    });
    const connectionData = res?.data?.[0];
    connectionData &&
      dispatch({
        type: ADD_CONNECTION,
        payload: {
          connectionData,
          connectionId,
          isTeamMate,
        },
      });
    return connectionData;
  };
};
