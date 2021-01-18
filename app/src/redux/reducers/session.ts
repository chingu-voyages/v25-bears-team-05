import { IActionProps } from "../actions/actions.type";
import { SET_APP_START_URL_PATH, SET_IS_LOGGED_IN } from "../actionTypes";
import { IStoreState } from "../store.type";

const initialState: IStoreState["session"] = {
  isLoggedIn: undefined,
  appStartUrlPath: "/",
};

export default function session(
  state: IStoreState["session"] = initialState,
  action: IActionProps
) {
  switch (action.type) {
    case SET_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
      };
    }
    case SET_APP_START_URL_PATH: {
      return {
        ...state,
        appStartUrlPath: action.payload.path,
      };
    }
    default:
      return state;
  }
}
