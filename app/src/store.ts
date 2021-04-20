import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import profileReducer from "./pages/profile/profileSlice";
import homeReducer from "./pages/home/homeSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    home: homeReducer,
  },
});
