import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFeed } from "../../services/feed/feed";
import { IFeed, IFeedItem } from "../../services/feed/feed.type";
import { addThread } from "../../services/thread";
import {
  addThreadReaction,
  getThreads,
  removeThreadReaction,
} from "../../services/thread";
import {
  addComment,
  deleteComment,
  getComments,
} from "../../services/thread/comment";
import {
  INewThreadData,
  IThreadComment,
} from "../../services/thread/thread.type";
import stateStatus from "../../utils/stateStatus";

const initialState = {
  threads: {},
  comments: {},
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
export const readThreadsAsync = createAsyncThunk(
  "home/readThreads",
  async (threadIds: string[]) => {
    const res = await getThreads({ threadIds });
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
  async (commentIds: string[]) => {
    const res = await getComments({ commentIds });
    return res;
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
  async ({ commentId }: { commentId: string }) => {
    const res = await deleteComment({ commentId });
    return res;
  }
);

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
      .addCase(readThreadsAsync.pending, (state) => {
        stateStatus.loading(state, "getting thread");
      })
      .addCase(readThreadsAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          ...action.payload,
        };
      })
      .addCase(readThreadsAsync.rejected, (state) => {
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
          [action.payload.updatedThread.id]: action.payload.updatedThread,
        };
        state.comments = {
          ...state.comments,
          [action.payload.newComment.id]: action.payload.newComment,
        };
      })
      .addCase(createThreadCommentAsync.rejected, (state) => {
        stateStatus.error(state, "unable to upload comment");
      })
      .addCase(readThreadCommentsAsync.pending, (state) => {
        stateStatus.loading(state, "getting comments");
      })
      .addCase(readThreadCommentsAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        const comments: any = {};
        action.payload?.forEach(
          (comment: IThreadComment) => (comments[comment._id] = comment)
        );
        state.comments = {
          ...state.comments,
          ...comments,
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
          [action.payload.updatedThread.id]: action.payload.updatedThread,
        };
        const comments: any = { ...state.comments };
        delete comments[action.payload.commentId];
        state.comments = {
          ...comments,
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

export const selectThreadById = (threadId: string) => (state: any) =>
  state.home.threads[threadId];

export const selectThreads = (state: any) => state.home.threads;

export const selectLatestBucketDate = (state: any) =>
  Object.keys(state.home.feed)
    .map((key) => key.substr(0, 24))
    .sort()
    .reverse()[0];

export const selectCommentById = (commentId: string) => (
  state: any
): IThreadComment => state.home.comments[commentId];
