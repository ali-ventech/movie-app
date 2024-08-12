import React from "react";
import { Box, Container, Typography } from "@mui/material";
import MovieList from "../components/MovieList";

const HomePage: React.FC = () => {
  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4">Movies</Typography>
      <MovieList />
    </Container>
  );
};

export default HomePage;
