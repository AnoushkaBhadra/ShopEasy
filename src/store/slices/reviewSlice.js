import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
      state.error = null;
    },

    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },

    clearReviews: (state) => {
      state.reviews = [];
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setReviews,
  addReview,
  clearReviews,
  setLoading,
  setError,
} = reviewSlice.actions;

export default reviewSlice.reducer;