import { createSlice } from "@reduxjs/toolkit";

export interface INotification {
  unreadNotificationCount: number;
}
const initialState: INotification = {
  unreadNotificationCount: 0,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
});

export const selectUnreadNotificationCount = (state: INotification) =>
  state.unreadNotificationCount;

export default notificationSlice.reducer;
