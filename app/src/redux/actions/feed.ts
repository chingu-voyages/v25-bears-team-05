import { Dispatch } from "redux";
import { getFeed } from "../../services/feed/feed";
import { SET_FEED_QUERY, UPDATE_FEED } from "../actionTypes";
import handleServiceRequest from "../handleServiceRequest";
import store from "../store";
import { updateThread } from "./threads";

export const updateFeed = (buckets) => ({
  type: UPDATE_FEED,
  payload: {
    buckets,
  },
});

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
    query: { filter, offset, limit },
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
        // if new buckets set oldest oldestBucketRecieved to oldest bucket in resBuckets
        const feedData = [];
        resBuckets.forEach((feedItem) => {
          if (thread) {
            dispatch(updateThread(feedItem));
          }
          const { threadId, updatedAt, createdAt, postedById } = feedItem;
          feedData.push({ threadId, updatedAt, createdAt, postedById });
        });

        // add threads
        // make feed array: [{threadId, dates, postedById...}]
        dispatch(updateFeed(feedData));
      }
    };
  }
};

export const fetchFeedNext = () => {
  const state = store.getState();
  const { oldestBucketRecieved, limit } = state.feed.query;

  return async (dispatch: Dispatch) => {
    const resBuckets = await handleServiceRequest({
      requestFunction: getFeed,
      requestProps: { filter: "next", oldestBucketRecieved, limit },
    });
    if (resBuckets) {
      // if already have oldest responded bucket set oldestBucketRecieved to oldest bucket in states feedData
      const resBucketDates = Object.keys(resBuckets).sort(
        (a, b) => parseInt(b) - parseInt(a)
      );
      const oldestResBucketDate = resBucketDates[0];
      if (state.feed.buckets.hasOwnProperty(oldestResBucketDate)) {
        const stateBucketDates = Object.keys(state.feed.buckets).sort(
          (a, b) => parseInt(b) - parseInt(a)
        );
        const oldestStateBucketDate = stateBucketDates[0];
        dispatch(setFeedQuery({ oldestBucketRecieved: oldestStateBucketDate }));
      }

      // Split out thread/user data from buckets and store/update in thread/user store
      const newBuckets = { ...resBuckets };
      Object.entries(resBuckets).forEach(([bucketKey, bucketValue]) => {
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
    } else {
    }
  };
};
