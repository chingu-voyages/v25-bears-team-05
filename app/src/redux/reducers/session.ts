import { IActionProps } from "../actions/actions.type";
import { SET_IS_LOGGED_IN } from "../actionTypes";
import { IStoreState } from "../store.type";

const initialState: {
  isLoggedIn: boolean | undefined;
} = {
  isLoggedIn: undefined,
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
    default:
      return state;
  }
}
