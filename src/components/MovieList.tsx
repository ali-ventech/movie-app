import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { ImageList, ImageListItem } from "@mui/material";
import MovieCard from "./MovieCard";
import axios from "axios";
import { setInitialMovies } from "../redux/slices/searchHistorySlice";

interface Movie {
  id: number;
  title: string;
}

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

  return (
    <ImageList
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        gap: 16,
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        paddingBottom: 4,
        paddingTop: 4,
      }}
    >
      {movies.map((movie: Movie) => (
        <ImageListItem
          key={movie.id}
          sx={{
            transition: "transform 0.3s, height 0.3s",
            "&:hover": {
              transform: "scale(1.2)",
              zIndex: 1,
              cursor: "pointer",
            },
          }}
        >
          <MovieCard movie={movie} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default MovieList;
