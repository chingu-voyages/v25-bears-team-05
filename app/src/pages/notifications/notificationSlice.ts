import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../../services/notifications";
import stateStatus from "../../utils/stateStatus";

export interface INotification {
  read: boolean;
  type: string;
  message: string;
  link: string;
  originatorId: string;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationState {
  unreadNotificationCount: number;
  notifications: INotification[];
  status: {
    state: string;
  };
}
const initialState: INotificationState = {
  unreadNotificationCount: 0,
  notifications: [],
  status: {
    state: "idle",
  },
};

export const getNotificationsAsync = createAsyncThunk(
  "notifications/getNotificationsAsync",
  async () => {
    const response = await getNotifications();
    return response;
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationsAsync.pending, (state) => {
        stateStatus.loading(state, "getting notifications");
      })
      .addCase(getNotificationsAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.unreadNotificationCount = action.payload.length;
        state.notifications = action.payload;
      })
      .addCase(getNotificationsAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get notifications");
      });
  },
});
export const selectUnreadNotificationCount = (state: any) =>
  state.notifications.unreadNotificationCount;
export const selectNotifications = (state: any) =>
  state.notifications.notifications;
export default notificationSlice.reducer;
