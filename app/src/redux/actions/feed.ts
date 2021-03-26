import { Dispatch } from "redux";
import { getHomeFeed } from "../../services/feed/feed";
import { UPDATE_FEED } from "../actionTypes";
import handleServiceRequest from "../handleServiceRequest";
import store from "../store";
import { IBucket, IBucketItem } from "../store.type";

export const updateFeed = ({
  collection,
  destination,
  setNextDone,
}: {
  collection: IBucket["collection"];
  destination: IBucketItem["destination"];
  setNextDone?: () => void;
}) => {
  // TODO: Split out thread and user data from buckets
  // TODO: add to or update data in thread and user stores
  // TODO: add next function (handles calling fetchFeedNext) into collection
  // TODO: if setNextDone exists call it (collection is the result response of caliing that next so it's finished)

  const newCollection: any = { ...collection };

  return {
    type: UPDATE_FEED,
    payload: {
      destination,
      collection: newCollection,
    },
  };
};

let lastFetchLatestFeedTime = 0;
const oneMinute = 1000 * 60;
export const fetchLatestFeed = (destination: IBucketItem["destination"]) => {
  const state = store.getState();
  const latestBucketRecieved = Object.keys(state.feed[destination]).sort(
    (a, b) => new Date(b).valueOf() - new Date(a).valueOf()
  )[0];
  const nowTime = Date.now();
  if (lastFetchLatestFeedTime < nowTime - oneMinute) {
    const query = `newerThanDate=${latestBucketRecieved}`;
    return async (dispatch: Dispatch) => {
      const resBuckets = await handleServiceRequest({
        requestFunction: getHomeFeed,
        requestProps: { query },
      });
      dispatch(updateFeed(resBuckets));
      lastFetchLatestFeedTime = nowTime;
    };
  }
};

export const fetchFeedNext = ({
  destination,
  olderThanDate,
  setNextDone,
}: {
  destination: IBucketItem["destination"];
  olderThanDate: string;
  setNextDone: IBucket["next"];
}) => {
  // TODO
};
