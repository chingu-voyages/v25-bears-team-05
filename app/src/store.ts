import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import profileReducer from "./pages/profile/profileSlice";
import homeReducer from "./pages/home/homeSlice";
import searchReducer from "./pages/search/searchSlice";
import notificationReducer from "./pages/notifications/notificationSlice";
import threadReducer from "./pages/thread/threadSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    home: homeReducer,
    search: searchReducer,
    notifications: notificationReducer,
    thread: threadReducer,
  },
});
