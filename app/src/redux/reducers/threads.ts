import { IActionProps } from "../actions/actions.type";
import {
  PUT_THREAD,
  REMOVE_THREAD,
  ADD_REACTION,
  REMOVE_REACTION,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actionTypes";
import { IStoreState } from "../store.type";

const initialState = {};

export default function threads(
  state: IStoreState["threads"] = initialState,
  action: IActionProps
) {
  switch (action.type) {
    case PUT_THREAD: {
      const { threadData } = action.payload;
      return {
        ...state,
        [threadData._id]: threadData,
      };
    }
    case REMOVE_THREAD: {
      const { threadId } = action.payload;
      const newState = { ...state };
      delete newState[threadId];
      return newState;
    }
    case ADD_REACTION: {
      const { threadId, title, reactionId } = action.payload;
      const newThreadData = { ...state[threadId] };
      if (newThreadData.reactionsCount[title]) {
        newThreadData.reactionsCount[title]++;
      } else {
        newThreadData.reactionsCount[title] = 1;
      }
      newThreadData.currentUserReactions[title] = reactionId;
      return {
        ...state,
        [newThreadData._id]: newThreadData,
      };
    }
    case REMOVE_REACTION: {
      const { threadId, title } = action.payload;
      const newThreadData = { ...state[threadId] };
      if (newThreadData.reactionsCount[title]) {
        newThreadData.reactionsCount[title]--;
      } else {
        newThreadData.reactionsCount[title] = 0;
      }
      newThreadData.currentUserReactions[title] = false;
      return {
        ...state,
        [newThreadData._id]: newThreadData,
      };
    }
    case ADD_COMMENT: {
      const { threadId, commentData } = action.payload;
      const newThreadData = { ...state[threadId] };
      if (newThreadData.comments) {
        newThreadData.comments = [commentData, ...newThreadData.comments];
      } else {
        newThreadData.comments = [commentData];
      }
      return {
        ...state,
        [newThreadData._id]: newThreadData,
      };
    }
    case REMOVE_COMMENT: {
      const { threadId, commentId } = action.payload;
      const newThreadData = { ...state[threadId] };
      if (newThreadData.comments) {
        newThreadData.comments = newThreadData.comments.filter(
          (_id) => _id !== commentId
        );
        return {
          ...state,
          [newThreadData._id]: newThreadData,
        };
      }
      return state;
    }
    default:
      return state;
  }
}
