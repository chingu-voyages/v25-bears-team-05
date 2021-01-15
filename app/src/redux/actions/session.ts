import { SET_IS_LOGGED_IN } from "../actionTypes";

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
  type: SET_IS_LOGGED_IN,
  payload: {
    isLoggedIn,
  },
});
