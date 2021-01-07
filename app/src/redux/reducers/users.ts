import { UPDATE_CURRENT_USER_INFO, UPDATE_USER } from "../actionTypes";

const initialState = {
  me: {
    id: "",
  },
};

export default function Users(state: any = initialState, action: any) {
  const userData = action?.payload?.userData;
  const updateUser = (userId: string) => {
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
      const updatedUserData = updateUser("me");
      return {
        ...updatedUserData,
      };
    }
    case UPDATE_USER: {
      return userData?.id && updateUser(userData.id);
    }
    default:
      return state;
  }
}
