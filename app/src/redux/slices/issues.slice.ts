import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../../api";
import { Issue } from "../../model/issue.model";

const STATE_KEY = "issues";

export type IssuesState = {
  items: Issue[];
  loading: boolean;
};

const initialState: IssuesState = {
  items: [],
  loading: false,
};

export const fetchIssues = createAsyncThunk(`${STATE_KEY}/fetchIssues`, ApiClient.fetchIssues);

export const issuesSlice = createSlice({
  name: STATE_KEY,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
