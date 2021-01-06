import { UPDATE_CURRENT_USER_INFO, UPDATE_USER } from "../actionTypes";

const initialState = {
  me: {
    id: "",
  },
};

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case UPDATE_CURRENT_USER_INFO: {
      const { userData } = action.payload;
      const newUserData = { ...state.me, ...userData };
      return {
        ...state,
        me: newUserData,
      };
    }
    case UPDATE_USER: {
      const { userData } = action.payload;
      const id = state.me?.id === userData.id ? "me" : userData.id;
      const newUserData =
        typeof state[id] === "object"
          ? { ...state[id], ...userData }
          : userData;
      return {
        ...state,
        [userData.id]: newUserData,
      };
    }
    default:
      return state;
  }
}
