import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doSearch } from "../../services/search/search";
import { ISearchResult } from "../../services/search/search.types";
import stateStatus from "../../utils/stateStatus";

const initialState = {
  query: "",
  results: {},
  status: {
    state: "idle",
  },
};

export const doSearchAsync = createAsyncThunk(
  "search/doSearchAsync",
  async (queryString: string) => {
    const result = await doSearch({ queryString });
    return {
      result,
      queryString,
    };
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doSearchAsync.pending, (state) => {
        stateStatus.loading(state, "searching query");
      })
      .addCase(doSearchAsync.fulfilled, (state, action) => {
        stateStatus.idle(state);
        state.results = {
          ...state.results,
          [action.payload.queryString]: action.payload.result,
        };
      })
      .addCase(doSearchAsync.rejected, (state) => {
        stateStatus.error(state, "unable search");
      });
  },
});

export const { setSearchQuery } = searchSlice.actions;

export const selectSearchStatus = (state: any) => state.search.status;
export const selectSearchQuery = (state: any) => state.search.query;
export const selectResultByCurrentQuery = (state: any): ISearchResult =>
  state.search.results[state.search.query];

export default searchSlice.reducer;
