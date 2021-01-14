import {
  SET_FEED_QUERY,
  SET_LAST_BUCKET_REACHED,
  UPDATE_FEED,
  UPDATE_FETCH_LASTEST_TIMESTAMP,
} from "../actionTypes";

const initialState = {
  buckets: {},
  query: {
    filter: "",
    offset: 0,
    limit: 20,
  },
};

export default function feed(state: any = initialState, action: any) {
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
