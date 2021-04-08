import { Dispatch } from "redux";
import { fetchFeed } from "../../services/feed/feed";
import { SET_NEXT_DONE, UPDATE_FEED } from "../actionTypes";
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
  setNextDone?: (latestUpdate: string) => void;
}) => {
  // Extract documentData (if present)
  Object.entries(collection).forEach(([priorty, bucket]) => {
    bucket.forEach((item, index) => {
      if (item.documentData) {
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
      }
    });
  });

  const itemDates = Object.values(collection)
    .flat()
    .map((item) => item.documentUpdatedAt)
    .sort((a, b) => b.getTime() - a.getTime());
  const latestUpdate = itemDates[0].toString();
  const oldestUpdate = itemDates[itemDates.length - 1].toString();

  // next function, handles calling fetchFeedNext when end of this bucket is reached
  const next = new Promise((resolve, reject) => () => {
    try {
      const done = (nextDateKey: string) => {
        store.dispatch({
          type: SET_NEXT_DONE,
          payload: {
            destination,
            latestUpdate,
            nextDateKey,
          },
        });
        resolve(true);
        fetchFeedNext({
          destination,
          olderThanDate: oldestUpdate,
          setNextDone: done,
        });
      };
    } catch (e) {
      reject(`Feed next failed: ${e}`);
    }
  });
  // if setNextDone exists call it (collection is the result response of caliing that next so it's finished)
  if (setNextDone) {
    setNextDone(latestUpdate);
  }

  const bucket = {
    collection,
    next,
  };

  return {
    type: UPDATE_FEED,
    payload: {
      destination,
      latestUpdate,
      bucket,
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
        requestFunction: fetchFeed,
        requestProps: { query, destination },
      });
      dispatch(
        updateFeed({
          collection: resBuckets as IBucket["collection"],
          destination,
        })
      );
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
  setNextDone: (latestUpdate: string) => void;
}) => {
  const query = `olderThanDate=${olderThanDate}`;
  return async (dispatch: Dispatch) => {
    const resBuckets = await handleServiceRequest({
      requestFunction: fetchFeed,
      requestProps: { query, destination },
    });
    dispatch(
      updateFeed({
        collection: resBuckets as IBucket["collection"],
        destination,
        setNextDone,
      })
    );
  };
};
