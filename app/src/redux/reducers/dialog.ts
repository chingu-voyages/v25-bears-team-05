import { IActionProps } from "../actions/actions.type";
import {
  ADD_ERROR_MESSAGE,
  ADD_SUCCESS_MESSAGE,
  ADD_INFO_MESSAGE,
  SET_LOADING,
  CLEAR_DIALOG,
} from "../actionTypes";
import { IStoreState } from "../store.type";

type TMessage = "error" | "success" | "info";
const initialState: {
  loading: boolean;
  log: Array<{ type: TMessage; message: string }>;
} = {
  loading: false,
  log: [],
};

export default function dialog(
  state: IStoreState["dialog"] = initialState,
  action: IActionProps
) {
  const handleAddMessage = (type: TMessage) => {
    const newLog = [{ type, message: action.payload.message }, ...state.log];
    return {
      ...state,
      log: newLog,
    };
  };
  switch (action.type) {
    case ADD_ERROR_MESSAGE: {
      return handleAddMessage("error");
    }
    case ADD_SUCCESS_MESSAGE: {
      return handleAddMessage("success");
    }
    case ADD_INFO_MESSAGE: {
      return handleAddMessage("info");
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }
    case CLEAR_DIALOG: {
      return {
        ...state,
        loading: false,
        log: [],
      };
    }
    default:
      return state;
  }
}
