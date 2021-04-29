import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addConnection,
  getUser,
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

const pendingGetRequests: any = {};
export const getUserAsync = createAsyncThunk(
  "profile/getUser",
  async (userId: string) => {
    if (!Object.keys(pendingGetRequests).includes(userId)) {
      pendingGetRequests[userId] = getUser({ userId });
    }
    const response = await pendingGetRequests[userId];
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
        stateStatus.loading(state, "getting user info");
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.users = {
          ...state.users,
          [action.payload.userData.id]: action.payload.userData,
        };
        if (action.payload.isCurrentUser) {
          state.currentUserId = action.payload.userData.id;
        }
      })
      .addCase(getUserAsync.rejected, (state) => {
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
