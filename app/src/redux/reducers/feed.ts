import { IActionProps } from "../actions/actions.type";
import { SET_NEXT_DONE, UPDATE_FEED } from "../actionTypes";
import { IBucketItem, IStoreState } from "../store.type";

const initialState = {
  home: {},
  profile: {},
  notification: {},
};

export default function feed(
  state: IStoreState["feed"] = initialState,
  action: IActionProps
) {
  switch (action.type) {
    case UPDATE_FEED: {
      return {
        ...state,
        [action.payload.destination as IBucketItem["destination"]]: {
          ...state[action.payload.destination as IBucketItem["destination"]],
          [action.payload.latestUpdate]: action.payload.bucket,
        },
      };
    }
    case SET_NEXT_DONE: {
      return {
        ...state,
        [action.payload.destination as IBucketItem["destination"]]: {
          ...state[action.payload.destination as IBucketItem["destination"]],
          [action.payload.latestUpdate]: {
            collection:
              state[action.payload.destination as IBucketItem["destination"]][
                action.payload.latestUpdate
              ].collection,
            next: action.payload.nextDateKey,
          },
        },
      };
    }
    default:
      return state;
  }
}
