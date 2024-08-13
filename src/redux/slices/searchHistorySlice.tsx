import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store"; // Assuming you have configured the store

interface Movie {
  id: number;
  title: string;
}

interface SearchHistoryState {
  movies: Movie[];
  initialFetched: boolean;
}

const initialState: SearchHistoryState = {
  movies: [],
  initialFetched: false,
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addMovieToHistory(state: SearchHistoryState, action: PayloadAction<Movie>) {
      const movie = action.payload;
      state.movies = [
        movie,
        ...state.movies.filter((m) => m.id !== movie.id),
      ].slice(0, 10);
    },
    setInitialMovies(
      state: SearchHistoryState,
      action: PayloadAction<Movie[]>
    ) {
      state.movies = action.payload;
      state.initialFetched = true;
    },
  },
});

export const { addMovieToHistory, setInitialMovies } =
  searchHistorySlice.actions;
export default searchHistorySlice.reducer;
