import {
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  UPDATE_CURRENT_USER_INFO,
  UPDATE_USER,
} from "../actionTypes";

const initialState = {
  me: {
    id: "",
  },
};

export default function Users(state: any = initialState, action: any) {
  const userData = action.payload?.userData || {};
  const getUpdatedUserState = (userId: string) => {
    const newUserData =
      typeof state[userId] === "object"
        ? { ...state[userId], ...userData }
        : userData;
    return {
      ...state,
      [newUserData.id]: newUserData,
      me: userId === "me" || state.me.id === userId ? newUserData : state.me,
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
      const userId = state.me.id;
      const { connectionId, isTeamMate } = action.payload;
      const newConnection = {
        userId: connectionId,
        isTeamMate,
      };
      const newConnectionsData = { ...state.me.connections, newConnection };
      const newUserData = { ...state.me, connections: newConnectionsData };
      return {
        ...state,
        [userId]: newUserData,
        me: newUserData,
      };
    }
    default:
      return state;
  }
}
