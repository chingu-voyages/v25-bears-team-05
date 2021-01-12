import { Dispatch } from "redux";
import { addThread as addThreadService } from "../../services/thread";
import { ADD_THREAD } from "../actionTypes";
import handleServiceRequest from "../handleServiceRequest";

export const addThreadsd = (data) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: addThreadService,
      requestProps: { data },
    });
    resData &&
      dispatch({
        type: ADD_THREAD,
        payload: {
          resData,
        },
      });
  };
};
