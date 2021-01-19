import { IActionProps } from "../actions/actions.type";
import {
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  UPDATE_CURRENT_USER_INFO,
  UPDATE_USER,
} from "../actionTypes";
import { IStoreState } from "../store.type";

const initialState = {};

export default function users(
  state: IStoreState["users"] = initialState,
  action: IActionProps
) {
  const userData = action.payload?.userData || {};
  const getUpdatedUserState = (userId: string) => {
    const newUserData =
      typeof state[userId] === "object"
        ? { ...state[userId], ...userData }
        : userData;
    return {
      ...state,
      [newUserData.id]: newUserData,
      me: newUserData.isCurrentUser ? newUserData : state.me,
    };
  };
  switch (action.type) {
    case UPDATE_CURRENT_USER_INFO: {
      const updatedUserData = getUpdatedUserState("me");
      return {
        ...updatedUserData,
      };
    }
    case UPDATE_USER: {
      return userData?.id && getUpdatedUserState(userData.id);
    }
    case REMOVE_CONNECTION: {
      const newConnectionsData = { ...state.me.connections };
      const { connectionId } = action.payload;
      delete newConnectionsData[connectionId];
      const newUserData = { ...state.me, connections: newConnectionsData };
      return {
        ...state,
        [state.me.id]: newUserData,
        me: newUserData,
      };
    }
    case ADD_CONNECTION: {
      const currentUserId = state.me.id;
      const connectionData = action.payload.connectionData;
      const newConnectionsData = { ...state.me.connections, ...connectionData };
      const newCurrentUserData = {
        ...state.me,
        connections: newConnectionsData,
      };
      const newConnectionUserData = state[action.payload.connectionId]
        ? {
            [action.payload.connectionId]: {
              ...state[action.payload.connectionId],
              isAConnection: true,
              isTeamMate: action.payload.isTeamMate,
            },
          }
        : {};
      return {
        ...state,
        ...newConnectionUserData,
        [currentUserId]: newCurrentUserData,
        me: newCurrentUserData,
      };
    }
    default:
      return state;
  }
}
