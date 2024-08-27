import React from "react";
import { Box, Container, Typography } from "@mui/material";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MovieCard from "../components/MovieCard";

const HomePage: React.FC = () => {
  const myMovies = useSelector(
    (state: RootState) => state.searchHistory.myMovies
  );
  return (
    <Container sx={{ pt: 18 }}>
      <Typography sx={{ marginBottom: -4, position: "relative" }}>
        Recent Movies
      </Typography>
      <MovieList />
      <Typography sx={{ marginBottom: -4 }}>My Movies</Typography>
      <MovieCard movies={myMovies} />
    </Container>
  );
};

export default HomePage;
