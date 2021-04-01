import { Dispatch } from "redux";
import { getHomeFeed } from "../../services/feed/feed";
import { UPDATE_FEED } from "../actionTypes";
import handleServiceRequest from "../handleServiceRequest";
import store from "../store";
import { IBucket, IBucketItem } from "../store.type";
import { updateThread } from "./threads";
import { updateUser } from "./users";

export const updateFeed = ({
  collection,
  destination,
  setNextDone,
}: {
  collection: IBucket["collection"];
  destination: IBucketItem["destination"];
  setNextDone?: () => void;
}) => {
  // Add to or update data in thread and user stores
  Object.entries(collection).forEach(([priorty, bucket]) => {
    bucket.forEach((item, index) => {
      switch (item.documentType) {
        case "thread":
          store.dispatch(updateThread(item.documentData));
          break;
        case "user":
          store.dispatch(updateUser(item.documentData));
          break;
        case "comment":
          // TODO: make updateThreadComment action
          break;
        case "connection":
          // TODO: make updateUserConnections action
          break;
        case "reaction":
          // TODO: make updateThreadReactions action
          break;
      }
      delete collection[priorty as any][index].documentData;
    });
  });

  // TODO: add next function (handles calling fetchFeedNext) into collection
  // TODO: if setNextDone exists call it (collection is the result response of caliing that next so it's finished)

  return {
    type: UPDATE_FEED,
    payload: {
      destination,
      collection,
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
