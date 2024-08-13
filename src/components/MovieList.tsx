import React, { useEffect, useState } from "react";
import { CircularProgress, Box, ImageList, ImageListItem } from "@mui/material";
import MovieCard from "./MovieCard";
import axios from "axios";
import { Loader } from "../mui/styles";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://yts.mx/api/v2/list_movies.json"
        );
        setMovies(response.data.data.movies.slice(0, 10) || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!movies.length) {
    return <div>No movies available</div>;
  }

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
      {movies.map((movie) => (
        <ImageListItem
          key={movie.id}
          sx={{
            minWidth: { xs: 80, sm: 100, md: 120, lg: 150 },
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
