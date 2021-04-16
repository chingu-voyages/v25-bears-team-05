import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFeed } from "../../services/feed/feed";
import { IFeed } from "../../services/feed/feed.type";
import { addThread } from "../../services/thread";
import {
  addComment,
  addThreadReaction,
  deleteComment,
  getComments,
  getThread,
  removeThreadReaction,
} from "../../services/thread/thread";
import { INewThreadData } from "../../services/thread/thread.type";
import stateStatus from "../../utils/stateStatus";

const initialState = {
  threads: {},
  feed: {},
  status: {
    state: "idle",
  },
};

// Thread thunks
export const createThreadAsync = createAsyncThunk(
  "home/createThread",
  async (data: INewThreadData) => {
    const res = await addThread({ data });
    return res;
  }
);
export const readThreadAsync = createAsyncThunk(
  "home/readThread",
  async ({ threadId }: { threadId: string }) => {
    const res = await getThread({ threadId });
    return res;
  }
);
// Updating thread not yet implemented
// export const updateThreadAsync = createAsyncThunk(
//   "home/updateThread",
//   async () => {

//   }
// );
// Deleting thread not yet implemented
// export const deleteThreadAsync = createAsyncThunk(
//   "home/deleteThread",
//   async () => {
//     delete
//   }
// );

// Reaction thunks
export const createThreadReactionAsync = createAsyncThunk(
  "home/createThreadReaction",
  async (data: { threadId: string; title: string }) => {
    const res = await addThreadReaction({ ...data });
    return res;
  }
);
export const deleteThreadReactionAsync = createAsyncThunk(
  "home/deleteThreadReaction",
  async (data: { threadId: string; threadLikeId: string }) => {
    const res = await removeThreadReaction({ ...data });
    return res;
  }
);

// Comment thunks
export const createThreadCommentAsync = createAsyncThunk(
  "home/createThreadComment",
  async (data: { threadId: string; data: { content: string } }) => {
    const res = await addComment({ ...data });
    return res;
  }
);
export const readThreadCommentsAsync = createAsyncThunk(
  "home/readThreadComment",
  async ({ threadId }: { threadId: string }) => {
    const res = getComments({ threadId });
    return {
      threadId,
      comments: res,
    };
  }
);
// Updating comment not yet implemented
// export const updateThreadCommentAsync = createAsyncThunk(
//   "home/updateThreadComment",
//   async () => {

//   }
// );
export const deleteThreadCommentAsync = createAsyncThunk(
  "home/deleteThreadComment",
  async (data: { threadId: string; commentId: string }) => {
    const res = await deleteComment({ ...data });
    return res;
  }
);

// Feed thunks
export const readHomeFeedLatestAsync = createAsyncThunk(
  "home/readHomeFeed",
  async ({ query }: { query: string }) => {
    const res = await getFeed({ query });
    return res;
  }
);
export const readHomeFeedNextAsync = createAsyncThunk(
  "home/readHomeFeed",
  async ({ query }: { query: string }) => {
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
      // Thread reducers
      .addCase(createThreadAsync.pending, (state) => {
        stateStatus.loading(state, "uploading thread");
      })
      .addCase(createThreadAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          [action.payload.id]: action.payload,
        };
      })
      .addCase(createThreadAsync.rejected, (state) => {
        stateStatus.error(state, "unable to upload thread");
      })
      .addCase(readThreadAsync.pending, (state) => {
        stateStatus.loading(state, "getting thread");
      })
      .addCase(readThreadAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          [action.payload.id]: action.payload,
        };
      })
      .addCase(readThreadAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get thread");
      })
      // .addCase(updateThreadAsync.pending, (state) => {
      //   stateStatus.loading(state, "updating thread");
      // })
      // .addCase(updateThreadAsync.fulfilled, (state, action) => {
      //   stateStatus.idle(state);
      //   state.threads = {
      //     ...state.threads,
      //     [action.payload.id]: action.payload,
      //   };
      // })
      // .addCase(updateThreadAsync.rejected, (state) => {
      //   stateStatus.error(state, "unable to update thread");
      // })
      // .addCase(deleteThreadAsync.pending, (state) => {
      //   stateStatus.loading(state, "deleting thread");
      // })
      // .addCase(deleteThreadAsync.fulfilled, (state, action) => {
      //   stateStatus.idle(state);
      //   const newThreadsState = {...state.threads};
      //   delete newThreadsState[action.payload.id];
      //   state.threads = newThreadsState;
      // })
      // .addCase(deleteThreadAsync.rejected, (state) => {
      //   stateStatus.error(state, "unable to delete thread");
      // })

      // Reaction reducers
      .addCase(createThreadReactionAsync.pending, (state) => {
        stateStatus.loading(state, "uploading reaction");
      })
      .addCase(createThreadReactionAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          [action.payload.id]: action.payload,
        };
      })
      .addCase(createThreadReactionAsync.rejected, (state) => {
        stateStatus.error(state, "unable to upload reaction");
      })
      .addCase(deleteThreadReactionAsync.pending, (state) => {
        stateStatus.loading(state, "removing reaction");
      })
      .addCase(deleteThreadReactionAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          [action.payload.id]: action.payload,
        };
      })
      .addCase(deleteThreadReactionAsync.rejected, (state) => {
        stateStatus.error(state, "unable to remove reaction");
      })

      // Comment reducers
      .addCase(createThreadCommentAsync.pending, (state) => {
        stateStatus.loading(state, "uploading comment");
      })
      .addCase(createThreadCommentAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          [action.payload.id]: action.payload,
        };
      })
      .addCase(readThreadCommentsAsync.pending, (state) => {
        stateStatus.loading(state, "getting comments");
      })
      .addCase(readThreadCommentsAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          [action.payload.threadId]: {
            ...(state.threads[
              action.payload.threadId as keyof typeof state.threads
            ] as Object),
            comments: action.payload.comments,
          },
        };
      })
      .addCase(readThreadCommentsAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get comments");
      })
      // .addCase(updateThreadCommentAsync.pending, (state) => {
      //   stateStatus.loading(state, "");
      // })
      // .addCase(updateThreadCommentAsync.fulfilled, (state, action) => {
      //   stateStatus.idle(state);
      //   state.threads = {
      //     ...state.threads,
      //   //  [action.payload.id]: action.payload,
      //   };
      // })
      // .addCase(updateThreadCommentAsync.rejected, (state) => {
      //   stateStatus.error(state, "");
      // })
      .addCase(deleteThreadCommentAsync.pending, (state) => {
        stateStatus.loading(state, "deleting comment");
      })
      .addCase(deleteThreadCommentAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          [action.payload.id]: action.payload,
        };
      })
      .addCase(deleteThreadCommentAsync.rejected, (state) => {
        stateStatus.error(state, "unable to delete comment");
      })

      // Feed reducers
      .addCase(readHomeFeedLatestAsync.pending, (state) => {
        stateStatus.loading(state, "getting latest feed");
      })
      .addCase(readHomeFeedLatestAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          ...action.payload.documents,
        };
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

export const selectHomeFeed = (state: any) => {
  const sortedBuckets = Object.keys(state.home.feed as IFeed)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map((key) => state.home.feed[key]);
  return sortedBuckets
    .map((bucket) => {
      const sortedCollection = Object.keys(bucket)
        .sort()
        .reverse()
        .map((priority) => bucket[priority]);
      return sortedCollection.flat();
    })
    .flat();
};
export const selectHomeStatus = (state: any) => state.home.status;
export const selectHomeError = (state: any) => state.home.error;

export const selectThreadById = (threadId: string) => (state: any) =>
  state.home.threads[threadId];
