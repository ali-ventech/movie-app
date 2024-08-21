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
  console.log("My Movies: ", myMovies);
  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4">Movies</Typography>
      <MovieList />
      <Typography variant="h4">My Movies</Typography>
      <MovieCard movies={myMovies} />;
    </Container>
  );
};

export default HomePage;
