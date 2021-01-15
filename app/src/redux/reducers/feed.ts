import { IActionProps } from "../actions/actions.type";
import {
  SET_FEED_QUERY,
  SET_LAST_BUCKET_REACHED,
  UPDATE_FEED,
} from "../actionTypes";
import { IStoreState } from "../store.type";

const initialState = {
  buckets: {},
  query: {
    filter: "",
    offset: 0,
    limit: 20,
  },
};

export default function feed(
  state: IStoreState["feed"] = initialState,
  action: IActionProps
) {
  switch (action.type) {
    case UPDATE_FEED: {
      return {
        ...state,
        buckets: { ...action.payload.buckets, ...state.buckets },
      };
    }
    case SET_FEED_QUERY: {
      return {
        ...state,
        query: { ...state.query, ...action.payload.query },
      };
    }
    default:
      return state;
  }
}
