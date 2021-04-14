import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkIfAuthed from "./services/checkIfAuthed";
import logout from "./services/logout";
import { getCookie } from "./utils/cookie";

const initialState = {
  status: "idle",
  isLoggedIn: getCookie("has-existing-auth-cookie") === "true" ? true : false,
};

export const checkIsAuthedAsync = createAsyncThunk(
  "app/checkAuth",
  async () => {
    const response = await checkIfAuthed();
    return response;
  }
);

export const logoutAsync = createAsyncThunk("app/logout", async () => {
  const response = await logout();
  return response;
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIsAuthedAsync.pending, (state) => {
        state.status = "logging in";
      })
      .addCase(checkIsAuthedAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = "logging out";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.isLoggedIn = false;
      });
  },
});

export const selectIsLoggedIn = (state: any) => state.app.isLoggedIn;
export const selectAuthStatus = (state: any) => state.app.status;

export default appSlice.reducer;
