import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  perfumes: [],
  page: 1,
  totalPages: 1,
  limit: 12,
  loading: false,
  error: null,
};

const perfumeSlice = createSlice({
  name: "perfumes",
  initialState,
  reducers: {
    fetchPerfumesStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchPerfumesSuccess: (state, action) => {
      state.loading = false;

      state.perfumes = action.payload.perfumes;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.limit = action.payload.limit;
    },

    fetchPerfumesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPerfumesStart,
  fetchPerfumesSuccess,
  fetchPerfumesFailure,
} = perfumeSlice.actions;

export default perfumeSlice.reducer;
