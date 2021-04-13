import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addConnection,
  getUser,
  removeConnection,
  updateUser,
} from "../../services/user";
import {
  IUserPatchRequest,
  IUserProcessed,
} from "../../services/user/user.type";

const initialState: {
  users: any; // { [keyof: string]: IUserProcessed; };
  currentUserId: "" | string;
  status: "idle" | string;
  error: "" | string;
} = {
  users: {},
  currentUserId: "",
  status: "idle",
  error: "",
};

export const getUserAsync = createAsyncThunk(
  "profile/getUser",
  async (userId: string) => {
    const response = await getUser({ userId });
    return {
      userData: response,
      isCurrentUser: userId === "me",
    };
  }
);

export const updateProfileAsync = createAsyncThunk(
  "profile/updateProfile",
  async (data: IUserPatchRequest) => {
    const response = await updateUser({ data });
    return response;
  }
);

export const addConnectionAsync = createAsyncThunk(
  "profile/addConnection",
  async ({
    connectionId,
    isTeamMate,
  }: {
    connectionId: string;
    isTeamMate: boolean;
  }) => {
    const response = await addConnection({ connectionId, isTeamMate });
    return response;
  }
);

export const removeConnectionAsync = createAsyncThunk(
  "profile/removeConnection",
  async ({ connectionId }: { connectionId: string }) => {
    const response = await removeConnection({ connectionId });
    return response;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateAvatarURL(state, action) {
      state.users = {
        ...state.users,
        [state.currentUserId]: {
          ...state.users[
            state.currentUserId as keyof typeof initialState.users
          ],
          avatar: [
            ...state.users[
              state.currentUserId as keyof typeof initialState.users
            ].avatar,
            { url: action.payload },
          ],
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = "getting user info";
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = {
          ...state.users,
          [action.payload.userData.id]: action.payload.userData,
        };
        if (action.payload.isCurrentUser) {
          state.currentUserId = action.payload.userData.id;
        }
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.status = "idle";
        state.error = "unable to get user";
      })

      .addCase(updateProfileAsync.pending, (state) => {
        state.status = "updating info";
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = {
          ...state.users,
          [state.currentUserId]: {
            ...state.users[
              state.currentUserId as keyof typeof initialState.users
            ],
            ...action.payload,
          },
        };
      })
      .addCase(updateProfileAsync.rejected, (state) => {
        state.status = "idle";
        state.error = "unable to update info";
      })

      .addCase(addConnectionAsync.pending, (state) => {
        state.status = "adding connection";
      })
      .addCase(addConnectionAsync.fulfilled, (state, action) => {
        const [
          connections,
          connectionOf,
        ] = (action.payload as unknown) as Object[];
        state.status = "idle";
        state.users = {
          ...state.users,
          [state.currentUserId]: {
            ...state.users[
              state.currentUserId as keyof typeof initialState.users
            ],
            connections,
            connectionOf,
          },
        };
      })
      .addCase(addConnectionAsync.rejected, (state) => {
        state.status = "idle";
        state.error = "unable to add connection";
      })

      .addCase(removeConnectionAsync.pending, (state) => {
        state.status = "removing connection";
      })
      .addCase(removeConnectionAsync.fulfilled, (state, action) => {
        const [
          connections,
          connectionOf,
        ] = (action.payload as unknown) as Object[];
        state.status = "idle";
        state.users = {
          ...state.users,
          [state.currentUserId]: {
            ...state.users[
              state.currentUserId as keyof typeof initialState.users
            ],
            connections,
            connectionOf,
          },
        };
      })
      .addCase(removeConnectionAsync.rejected, (state) => {
        state.status = "idle";
        state.error = "unable to remove connection";
      });
  },
});

export const { updateAvatarURL } = profileSlice.actions;

export const selectUserById = (userId: string) => (state: any) =>
  state.profile.users[userId === "me" ? state.profile.currentUserId : userId];
export const selectProfileStatus = (state: any) => state.profile.status;
export const selectProfileError = (state: any) => state.profile.error;

export default profileSlice.reducer;
