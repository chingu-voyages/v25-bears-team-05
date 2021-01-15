import { Dispatch } from "redux";
import { getFeed } from "../../services/feed/feed";
import {
  SET_FEED_QUERY,
  SET_LAST_BUCKET_REACHED,
  UPDATE_FEED,
} from "../actionTypes";
import handleServiceRequest from "../handleServiceRequest";
import store from "../store";
import { updateThread } from "./threads";

export const updateFeed = (buckets) => {
  // Split out thread and user data from buckets and add to or update in thread and user stores
  const newBuckets = { ...buckets };
  Object.entries(buckets).forEach(([bucketKey, bucketValue]) => {
    const { threads, users } = bucketValue;
    Object.entries(threads).forEach(([threadKey, threadValue]) => {
      updateThread(threadValue.threadData);
      delete newBuckets[bucketKey][threadKey].threadData;
    });
    Object.entries(users).forEach(([userKey, userValue]) => {
      updateThread(userValue.threadData);
      delete newBuckets[bucketKey][userKey].threadData;
    });
  });
  return {
    type: UPDATE_FEED,
    payload: {
      buckets: newBuckets,
    },
  };
};

export const setFeedQuery = ({
  filter,
  latestBucketRecieved,
  oldestBucketRecieved,
  limit,
}: {
  filter?: string;
  latestBucketRecieved?: string;
  oldestBucketRecieved?: string;
  offset?: number;
  limit?: number;
}) => ({
  type: SET_FEED_QUERY,
  payload: {
    query: { filter, latestBucketRecieved, oldestBucketRecieved, limit },
  },
});

let lastFetchLatestFeedTime = 0;
const oneMinute = 1000 * 60;
export const fetchLatestFeed = () => {
  const state = store.getState();
  const { latestBucketRecieved } = state.feed.query;
  const nowTIme = Date.now();
  if (lastFetchLatestFeedTime + oneMinute > nowTIme) {
    return async (dispatch: Dispatch) => {
      const resBuckets = await handleServiceRequest({
        requestFunction: getFeed,
        requestProps: { filter: "updates", latestBucketRecieved },
      });
      lastFetchLatestFeedTime = nowTIme;
      if (resBuckets) {
        // set oldest oldestBucketRecieved to oldest bucket in resBuckets
        const bucketDates = Object.keys(resBuckets).sort(
          (a, b) => parseInt(b) - parseInt(a)
        );
        const oldestResBucketDate = bucketDates[0];
        dispatch(setFeedQuery({ oldestBucketRecieved: oldestResBucketDate }));
      }
    };
  }
};

export const setLastBuckReached = () => ({
  type: SET_LAST_BUCKET_REACHED,
});

export const fetchFeedNext = () => {
  const state = store.getState();
  const { oldestBucketRecieved, limit } = state.feed.query;
  return async (dispatch: Dispatch) => {
    const resBuckets = await handleServiceRequest({
      requestFunction: getFeed,
      requestProps: { filter: "next", oldestBucketRecieved, limit },
    });
    if (resBuckets) {
      const bucketDates = Object.keys(resBuckets).sort(
        (a, b) => parseInt(b) - parseInt(a)
      );
      const oldestResBucketDate = bucketDates[0];
      // if already have oldest resBucket set oldestBucketRecieved to oldest in state
      if (state.feed.buckets.hasOwnProperty(oldestResBucketDate)) {
        const stateBucketDates = Object.keys(state.feed.buckets).sort(
          (a, b) => parseInt(b) - parseInt(a)
        );
        const oldestStateBucketDate = stateBucketDates[0];
        dispatch(setFeedQuery({ oldestBucketRecieved: oldestStateBucketDate }));
      }
      dispatch(updateFeed(resBuckets));
    } else {
      // end of feed
      dispatch(setLastBuckReached());
    }
  };
};
