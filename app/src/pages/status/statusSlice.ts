import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStatus, StatusType } from "./status.types";

const initialState: {
  log: Array<IStatus>;
} = {
  log: [],
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    addStatusLog(state, action: PayloadAction<IStatus>) {
      state.log = [action.payload, ...state.log];
    },
  },
});

export default statusSlice.reducer;

export const { addStatusLog } = statusSlice.actions;

export const selectStatusLog = (state: any) => state.status.log;

export const selectStatusLogByType = (type: StatusType) => (state: any) =>
  state.status.log.filter((status: IStatus) => status.type === type);
