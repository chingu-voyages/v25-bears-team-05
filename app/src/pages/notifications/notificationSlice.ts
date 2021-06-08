import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../../services/notifications";
import { markNotificationAsRead } from "../../services/notifications/notifications";
import StatusSetter from "../status/StatusSetter";

const stateStatus = new StatusSetter("notification");

export interface INotification {
  _id: string;
  read: boolean;
  type: string;
  message: string;
  link: string;
  originatorId: string;
  targetId: string;
  createdAt: string;
  updatedAt: string;
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

export const markNotificationAsReadAsync = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId: string) => {
    const response = await markNotificationAsRead(notificationId);
    return response;
  }
);

function getUnreadNotificationCount(notifications: INotification[]): number {
  return notifications.reduce((acc, cv) => {
    return cv.read === false ? acc + 1 : acc + 0;
  }, 0);
}

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
        state.unreadNotificationCount = getUnreadNotificationCount(
          action.payload
        );
        state.notifications = action.payload;
        if (state.unreadNotificationCount > 0) {
          document.title = `(${state.unreadNotificationCount}) Notifications | SyncedUp`;
        } else {
          document.title = "SyncedUp";
        }
      })
      .addCase(getNotificationsAsync.rejected, (state) => {
        stateStatus.error(state, "unable to get notifications");
      })
      .addCase(markNotificationAsReadAsync.pending, (state) => {
        stateStatus.loading(state, "processing marking notification as read");
      })
      .addCase(markNotificationAsReadAsync.fulfilled, (state, action) => {
        state.unreadNotificationCount = getUnreadNotificationCount(
          action.payload
        );
        state.notifications = action.payload!;
      })
      .addCase(markNotificationAsReadAsync.rejected, (state) => {
        stateStatus.error(state, "unable to update notifications");
      });
  },
});
export const selectUnreadNotificationCount = (state: any) =>
  state.notifications.unreadNotificationCount;
export const selectNotifications = (state: any) =>
  state.notifications.notifications;
export default notificationSlice.reducer;
