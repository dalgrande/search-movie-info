import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovie = createAsyncThunk(
  "movies/fetchMovies",
  async (title: string) => {
    const response = await axios.get(`http://localhost:3000/movies/${title}`);
    return response.data;
  }
);

type Movie = {
  title: string;
  year: string;
  plot: string;
  actors: string;
  rating: string;
  poster: string;
  message: string;
};

export interface MovieState {
  data: Movie;
  isLoading?: boolean;
  error: string | null;
}

const initialState: MovieState = {
  data: {
    title: "",
    year: "",
    plot: "",
    actors: "",
    rating: "",
    poster: "",
    message: "",
  },
  isLoading: false,
  error: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    resetMovie: (state) => {
      state.data = initialState.data;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const { resetMovie } = movieSlice.actions;
export default movieSlice.reducer;
