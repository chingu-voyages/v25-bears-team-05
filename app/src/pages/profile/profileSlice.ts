import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addConnection,
  getUsers,
  removeConnection,
  updateUser,
} from "../../services/user";
import { IUserPatchRequest } from "../../services/user/user.type";
import stateStatus from "../../utils/stateStatus";

const initialState: {
  [keyof: string]: any;
} = {
  users: {},
  currentUserId: "",
  status: {
    state: "idle",
  },
};

export const getUsersAsync = createAsyncThunk(
  "profile/getUsers",
  async (userIds: string[]) => {
    const response = await getUsers({ userIds });
    return response;
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
      .addCase(getUsersAsync.pending, (state) => {
        stateStatus.loading(state, "getting user info");
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.users = {
          ...state.users,
          ...action.payload.users,
        };
        if (action.payload.currentUserId) {
          state.currentUserId = action.payload.currentUserId;
        }
      })
      .addCase(getUsersAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get user");
      })

      .addCase(updateProfileAsync.pending, (state) => {
        stateStatus.loading(state, "updating info");
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
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
        stateStatus.error(state, "unable to update info");
      })

      .addCase(addConnectionAsync.pending, (state) => {
        stateStatus.loading(state, "adding connection");
      })
      .addCase(addConnectionAsync.fulfilled, (state, action) => {
        const [
          connections,
          connectionOf,
        ] = (action.payload as unknown) as Object[];
        stateStatus.idle(state);
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
        stateStatus.error(state, "unable to add connection");
      })

      .addCase(removeConnectionAsync.pending, (state) => {
        stateStatus.loading(state, "removing connection");
      })
      .addCase(removeConnectionAsync.fulfilled, (state, action) => {
        const [
          connections,
          connectionOf,
        ] = (action.payload as unknown) as Object[];
        stateStatus.idle(state);
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
        stateStatus.error(state, "unable to remove connection");
      });
  },
});

export const { updateAvatarURL } = profileSlice.actions;

export const selectUserById = (userId: string) => (state: any) =>
  state.profile.users[userId === "me" ? state.profile.currentUserId : userId];
export const selectProfileStatus = (state: any) => state.profile.status;
export const selectCurrentUserId = (state: any) => state.profile.currentUserId;
export const selectIsAConnection = (userId: string) => (state: any) => {
  const connections =
    state.profile.users[state.profile.currentUserId]?.connections;
  if (connections && Object.keys(connections).includes(userId)) {
    return true;
  }
  return false;
};
export const selectUserConnections = (userId: string) => (state: any) =>
  state.profile.users[userId === "me" ? state.profile.currentUserId : userId]
    ?.connections;

export default profileSlice.reducer;