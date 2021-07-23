import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFeed } from "../../services/feed/feed";
import { IFeed, IFeedItem } from "../../services/feed/feed.type";
import stateStatus from "../../utils/stateStatus";

const initialState = {
  feed: {},
  status: {
    state: "idle",
  },
};

// Feed thunks
export const readHomeFeedLatestAsync = createAsyncThunk(
  "home/readHomeFeedLatest",
  async ({ query }: { query: string }) => {
    const res = await getFeed({ query });
    return res;
  }
);
export const readHomeFeedNextAsync = createAsyncThunk(
  "home/readHomeFeedNext",
  async ({
    oldestUpdateFromCurrentBucket,
    latestUpdateFromNextNext,
  }: {
    oldestUpdateFromCurrentBucket: string;
    latestUpdateFromNextNext: string;
  }) => {
    const query = `olderThanDate=${oldestUpdateFromCurrentBucket}&newerThanDate=${latestUpdateFromNextNext}`;
    const res = await getFeed({ query });
    return res;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Feed reducers
      .addCase(readHomeFeedLatestAsync.pending, (state) => {
        stateStatus.loading(state, "getting latest feed");
      })
      .addCase(readHomeFeedLatestAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.feed = {
          ...state.feed,
          ...action.payload.bucket,
        };
      })
      .addCase(readHomeFeedLatestAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get feed");
      });
  },
});

export default homeSlice.reducer;

export const selectHomeFeed = (state: any): Array<IFeedItem> => {
  const sortedBuckets = Object.keys(state.home.feed as IFeed)
    .sort(
      (a, b) => parseInt(b.split("_uuid_")[0]) - parseInt(a.split("_uuid_")[0])
    )
    .map((key) => state.home.feed[key]);
  const feedItems = sortedBuckets
    .map((bucket) => {
      const sortedCollection = Object.keys(bucket.collection)
        .sort()
        .reverse()
        .map((priority) => bucket.collection[priority]);
      return sortedCollection.flat();
    })
    .flat();
  return feedItems;
};
export const selectHomeStatus = (state: any) => state.home.status;

export const selectLatestBucketDate = (state: any) =>
  Object.keys(state.home.feed)
    .map((key) => key.substr(0, 24))
    .sort()
    .reverse()[0];
