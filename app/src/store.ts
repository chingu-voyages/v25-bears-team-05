import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import profileReducer from "./pages/profile/profileSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
  },
});
