import { createSlice } from "@reduxjs/toolkit";

const apiData = createSlice({
  initialState: {
    movieDetail: null,
    topRatedMovies: null,
    upcomingMovies: null,
  },
  name: "ALLDATA",
  reducers: {
    addData: (state, action) => {
      state.movieDetail = action.payload;
    },
    addTopRated: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
  },
});
export const { addData, addTopRated, addUpcomingMovies } = apiData.actions;
export default apiData.reducer;
