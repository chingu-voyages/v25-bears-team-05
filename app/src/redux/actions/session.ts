import { SET_APP_START_URL_PATH, SET_IS_LOGGED_IN } from "../actionTypes";

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
  type: SET_IS_LOGGED_IN,
  payload: {
    isLoggedIn,
  },
});
export const setAppStartUrlPath = (path: string) => ({
  type: SET_APP_START_URL_PATH,
  payload: {
    path,
  },
});
