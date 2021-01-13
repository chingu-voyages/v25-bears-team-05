import { Dispatch } from "redux";
import { addThread as addThreadService, addThreadReaction, removeThreadReaction } from "../../services/thread";
import { INewThreadData } from "../../services/thread/thread.type";
import { ADD_REACTION, ADD_THREAD, REMOVE_REACTION, REMOVE_THREAD } from "../actionTypes";
import handleServiceRequest from "../handleServiceRequest";

export const addThread = (threadData: INewThreadData) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: addThreadService,
      requestProps: { threadData },
    });
    resData &&
      dispatch({
        type: ADD_THREAD,
        payload: {
          threadData: resData,
        },
      });
  };
};

export const removeThread = (threadId: string) => {
  return async (dispatch: Dispatch) => {
    const res = await handleServiceRequest({
      requestFunction: removeThread,
      requestProps: { threadId }
    });
    res && 
      dispatch({
        type: REMOVE_THREAD,
        payload: {
          threadId
        }
      });
  }
};

export const addReaction = ({
  threadId,
  title,
}: {
  threadId: string;
  title: string;
}) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: addThreadReaction,
      requestProps: { threadId, title }
    });
    resData && 
      dispatch({
        type: ADD_REACTION,
        payload: {
          threadId,
          title,
          reactionId: resData._id
        }
      });
  }
};

export const removeReaction = ({
  threadId,
  reactionId,
}: {
  threadId: string,
  reactionId: string,
}) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: removeThreadReaction,
      requestProps: { threadId, reactionId }
    });
    resData && 
      dispatch({
        type: REMOVE_REACTION,
        payload: {
          threadId,
          reactionId,
        }
      });
  }
}

export const addComment = () => {

}

export const removeComment = () => {

}