import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../../services/notifications";
import {
  dismissNotification,
  markNotificationAsRead,
} from "../../services/notifications/notifications";
import stateStatus from "../../utils/stateStatus";

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
  contextMenusOpen: string[];
}

const initialState: INotificationState = {
  unreadNotificationCount: 0,
  notifications: [],
  status: {
    state: "idle",
  },
  contextMenusOpen: [],
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

export const dismissNotificationAsync = createAsyncThunk(
  "notifications/dismissNotification",
  async (notificationId: string) => {
    const response = await dismissNotification(notificationId);
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
  reducers: {
    setContextMenuOpen(state, action: { payload: string }) {
      if (!state.contextMenusOpen.includes(action.payload)) {
        state.contextMenusOpen = [...state.contextMenusOpen, action.payload];
      }
    },
    setCloseContextMenu(state, action: { payload: string }) {
      const menuArray = [...state.contextMenusOpen].filter(
        (id) => id !== action.payload
      );
      state.contextMenusOpen = menuArray;
    },
  },
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
      })
      .addCase(dismissNotificationAsync.pending, (state) => {
        stateStatus.loading(state, "dismissing notification");
      })
      .addCase(dismissNotificationAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.unreadNotificationCount = getUnreadNotificationCount(
          action.payload
        );
        state.notifications = action.payload!;
      })
      .addCase(dismissNotificationAsync.rejected, (state) => {
        stateStatus.loading(state, "failed to  dismiss notification");
      });
  },
});
export const selectUnreadNotificationCount = (state: any) =>
  state.notifications.unreadNotificationCount;
export const selectNotifications = (state: any) =>
  state.notifications.notifications;
export const selectOpenMenus = (state: any) =>
  state.notifications.contextMenusOpen;
export default notificationSlice.reducer;
export const { setContextMenuOpen } = notificationSlice.actions;
export const { setCloseContextMenu } = notificationSlice.actions;
