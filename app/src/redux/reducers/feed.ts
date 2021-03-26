import { IActionProps } from "../actions/actions.type";
import { UPDATE_FEED } from "../actionTypes";
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
          ...action.payload.buckets,
          ...state[action.payload.destination as IBucketItem["destination"]],
        },
      };
    }
    default:
      return state;
  }
}
