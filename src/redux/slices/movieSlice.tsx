import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Movie } from "../../types.ts/movieType";

interface movieState {
  movies: Movie[];
  initialFetched: boolean;
  favourites: Movie[];
  myMovies: Movie[];
  courselIndex: number;
}

const initialState: movieState = {
  movies: [],
  initialFetched: false,
  favourites: [],
  myMovies: [],
  courselIndex: 0,
};

const movieSlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addMovieToHistory(state: movieState, action: PayloadAction<Movie>) {
      const movie = action.payload;
      state.movies = [
        movie,
        ...state.movies.filter((m) => m.id !== movie.id),
      ].slice(0, 10);
    },
    setInitialMovies(state: movieState, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
      state.initialFetched = true;
    },
    addToFavourites(state: movieState, action: PayloadAction<Movie>) {
      let isFavourite = false;
      const movie = action.payload;
      state.favourites.forEach((m) => {
        if (m.id === movie.id) {
          isFavourite = true;
        }
      });
      if (!isFavourite) {
        state.favourites = [movie, ...state.favourites];
      } else {
        state.favourites = [
          ...state.favourites.filter((m) => m.id !== movie.id),
        ];
      }
    },
    addMovie(state: movieState, action: PayloadAction<Movie>) {
      const movie = action.payload;
      state.myMovies = [movie, ...state.myMovies];
    },
    setCourselIndex(state, action: PayloadAction<number>) {
      state.courselIndex = action.payload;
    },
  },
});

export const {
  addMovieToHistory,
  setInitialMovies,
  addToFavourites,
  addMovie,
  setCourselIndex,
} = movieSlice.actions;
export default movieSlice.reducer;
