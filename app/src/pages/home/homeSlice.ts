import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFeed } from "../../services/feed/feed";
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
export const readThreadCommentAsync = createAsyncThunk(
  "home/readThreadComment",
  async ({ threadId }: { threadId: string }) => {
    const res = getComments({ threadId });
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
  async (data: { threadId: string; commentId: string }) => {
    const res = await deleteComment({ ...data });
    return res;
  }
);

// Feed thunks
export const readHomeFeedAsync = createAsyncThunk(
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
        stateStatus.loading(state, "");
      })
      .addCase(createThreadReactionAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          //  [action.payload.id]: action.payload,
        };
      })
      .addCase(createThreadReactionAsync.rejected, (state) => {
        stateStatus.error(state, "");
      })
      .addCase(deleteThreadReactionAsync.pending, (state) => {
        stateStatus.loading(state, "");
      })
      .addCase(deleteThreadReactionAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          //  [action.payload.id]: action.payload,
        };
      })
      .addCase(deleteThreadReactionAsync.rejected, (state) => {
        stateStatus.error(state, "");
      })

      // Comment reducers
      .addCase(createThreadCommentAsync.pending, (state) => {
        stateStatus.loading(state, "");
      })
      .addCase(createThreadCommentAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          //  [action.payload.id]: action.payload,
        };
      })
      .addCase(createThreadCommentAsync.rejected, (state) => {
        stateStatus.error(state, "");
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
        stateStatus.loading(state, "");
      })
      .addCase(deleteThreadCommentAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          //  [action.payload.id]: action.payload,
        };
      })
      .addCase(deleteThreadCommentAsync.rejected, (state) => {
        stateStatus.error(state, "");
      })

      // Feed reducers
      .addCase(readHomeFeedAsync.pending, (state) => {
        stateStatus.loading(state, "");
      })
      .addCase(readHomeFeedAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.threads = {
          ...state.threads,
          //  [action.payload.id]: action.payload,
        };
      })
      .addCase(readHomeFeedAsync.rejected, (state) => {
        stateStatus.error(state, "");
      });
  },
});

export default homeSlice.reducer;
