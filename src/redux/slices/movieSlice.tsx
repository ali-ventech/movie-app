import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
interface Movie {
  id: number;
  title: string;
  medium_cover_image: string;
}

interface movieState {
  movies: Movie[];
  initialFetched: boolean;
  favourites: Movie[];
}

const initialState: movieState = {
  movies: [],
  initialFetched: false,
  favourites: [],
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
  },
});

export const { addMovieToHistory, setInitialMovies, addToFavourites } =
  movieSlice.actions;
export default movieSlice.reducer;
