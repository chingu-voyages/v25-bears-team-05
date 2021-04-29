import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import profileReducer from "./pages/profile/profileSlice";
import homeReducer from "./pages/home/homeSlice";
import searchReducer from "./pages/search/searchSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    home: homeReducer,
    search: searchReducer,
  },
});
