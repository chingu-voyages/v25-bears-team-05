import { ADD_CONNECTION, REMOVE_CONNECTION, UPDATE_CURRENT_USER_INFO, UPDATE_USER } from "../actionTypes";

const initialState = {
  me: {
    id: "",
  },
};

export default function Users(state: any = initialState, action: any) {
  const userData = action?.payload?.userData || {};
  const updateUser = (userId: string) => {
    const newUserData =
      typeof state[userId] === "object"
        ? { ...state[userId], ...userData }
        : userData;
    return {
      ...state,
      [newUserData.id]: newUserData,
      me: (userId === "me" || state.me.id === userId) ? newUserData : state.me,
    };
  };
  switch (action.type) {
    case UPDATE_CURRENT_USER_INFO: {
      const updatedUserData = updateUser("me");
      return {
        ...updatedUserData,
      };
    }
    case UPDATE_USER: {
      return userData?.id && updateUser(userData.id);
    }
    case REMOVE_CONNECTION: {
      const userId = state.me.id;
      const newConnectionsData = state.me.connections;
      delete newConnectionsData[action?.payload?.connectionId];
      const newUserData = {...state.me, connections: newConnectionsData};
      return {
        ...state,
        [userId]: newUserData,
        me: newUserData,
      };
    }
    case ADD_CONNECTION: {
      const userId = state.me.id;
      const connectionId = action?.payload?.connectionId;
      const newConnection = connectionId && {userId: connectionId}
      const newConnectionsData = {...state.me.connections, newConnection};
      const newUserData = {...state.me, connections: newConnectionsData};
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
