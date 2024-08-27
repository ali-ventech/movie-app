import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import MovieCard from "./MovieCard";
import axios from "axios";
import { setInitialMovies } from "../redux/slices/movieSlice";
import { Movie } from "../types.ts/movieType";

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const initialFetched = useSelector(
    (state: RootState) => state.searchHistory.initialFetched
  );

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://yts.mx/api/v2/list_movies.json"
        );
        const movies: Movie[] = response.data.data.movies.slice(0, 10) || [];
        dispatch(setInitialMovies(movies));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    if (!initialFetched) {
      fetchMovies();
    }
  }, [dispatch, initialFetched]);

  const movies = useSelector((state: RootState) => state.searchHistory.movies);

  return <MovieCard movies={movies} />;
};

export default MovieList;
