import { Dispatch } from "redux";
import {
  addThread as addThreadService,
  addThreadReaction,
  removeThreadReaction,
  addComment as addCommentService,
  deleteComment as deleteCommentService,
  getThread,
  editThread as editThreadService,
} from "../../services/thread";
import {
  INewThreadData,
  IThreadPatch,
} from "../../services/thread/thread.type";
import {
  ADD_COMMENT,
  ADD_REACTION,
  ADD_THREAD,
  REMOVE_COMMENT,
  REMOVE_REACTION,
  REMOVE_THREAD,
} from "../actionTypes";
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

export const editThread = (threadDataPatch: IThreadPatch) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: editThreadService,
      requestProps: { threadDataPatch },
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

export const updateThread = (threadData: INewThreadData) => ({
  type: ADD_THREAD,
  payload: {
    threadData,
  },
});

export const fetchThread = (threadId: string) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: getThread,
      requestProps: { threadId },
    });
    resData && dispatch(updateThread(resData));
  };
};

export const removeThread = (threadId: string) => {
  return async (dispatch: Dispatch) => {
    const res = await handleServiceRequest({
      requestFunction: removeThread,
      requestProps: { threadId },
    });
    res &&
      dispatch({
        type: REMOVE_THREAD,
        payload: {
          threadId,
        },
      });
  };
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
      requestProps: { threadId, title },
    });
    resData &&
      dispatch({
        type: ADD_REACTION,
        payload: {
          threadId,
          title,
          reactionId: resData._id,
        },
      });
  };
};

export const removeReaction = ({
  threadId,
  reactionId,
}: {
  threadId: string;
  reactionId: string;
}) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: removeThreadReaction,
      requestProps: { threadId, reactionId },
    });
    resData &&
      dispatch({
        type: REMOVE_REACTION,
        payload: {
          threadId,
          reactionId,
        },
      });
  };
};

export const addComment = ({
  threadId,
  commentData,
}: {
  threadId: string;
  commentData: { content: string };
}) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: addCommentService,
      requestProps: { threadId, commentData },
    });
    resData &&
      dispatch({
        type: ADD_COMMENT,
        payload: {
          threadId,
          commentData,
        },
      });
  };
};

export const removeComment = ({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) => {
  return async (dispatch: Dispatch) => {
    const resData = await handleServiceRequest({
      requestFunction: deleteCommentService,
      requestProps: { threadId, commentId },
    });
    resData &&
      dispatch({
        type: REMOVE_COMMENT,
        payload: {
          threadId,
          commentId,
        },
      });
  };
};
