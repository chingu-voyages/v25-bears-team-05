import {
  ADD_THREAD,
  DELETE_THREAD,
  ADD_REACTION,
  REMOVE_REACTION,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actionTypes";

const initialState = {};

export default function threads(state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_THREAD: {
      const threadData = action.payload.data;
      if (threadData) {
        return {
          ...state,
          [threadData.id]: threadData,
        };
      }
      return state;
    }
    case DELETE_THREAD: {
      const threadId = action.payload.threadId;
      const newState = { ...state };
      delete newState[threadId];
      return newState;
    }
    case ADD_REACTION: {
      const threadId = action.payload.threadId;
      const title = action.payload.title;
      const threadLikeId = action.payload.threadLikeId;
      const newThreadData = { ...state[threadId] };
      if (newThreadData.reactionsCount[title]) {
        newThreadData.reactionsCount[title]++;
      } else {
        newThreadData.reactionsCount[title] = 1;
      }
      newThreadData.currentUserReactions[title] = threadLikeId;
      return {
        ...state,
        [newThreadData.id]: newThreadData,
      };
    }
    case REMOVE_REACTION: {
      const threadId = action.payload.threadId;
      const title = action.payload.title;
      const newThreadData = { ...state[threadId] };
      if (newThreadData.reactionsCount[title]) {
        newThreadData.reactionsCount[title]--;
      } else {
        newThreadData.reactionsCount[title] = 0;
      }
      newThreadData.currentUserReactions[title] = false;
      return {
        ...state,
        [newThreadData.id]: newThreadData,
      };
    }
    case ADD_COMMENT: {
      const threadId = action.payload.threadId;
      const commentData = action.payload.commentData;
      const newThreadData = { ...state[threadId] };
      if (newThreadData.comments) {
        newThreadData.comments = [commentData, ...newThreadData.comments];
      } else {
        newThreadData.comments = [commentData];
      }
      return {
        ...state,
        [newThreadData.id]: newThreadData,
      };
    }
    case REMOVE_COMMENT: {
      const threadId = action.payload.threadId;
      const commentId = action.payload.commentId;
      const newThreadData = { ...state[threadId] };
      if (newThreadData.comments) {
        newThreadData.comments = newThreadData.comments.filter(
          (id: string) => id !== commentId
        );
        return {
          ...state,
          [newThreadData.id]: newThreadData,
        };
      }
      return state;
    }
    default:
      return state;
  }
}
