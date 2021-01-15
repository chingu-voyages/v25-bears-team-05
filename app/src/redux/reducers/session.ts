import { SET_IS_LOGGED_IN } from "../actionTypes";

const initialState = {
  isLoggedIn: false,
};

export default function session(state: any = initialState, action: any) {
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
