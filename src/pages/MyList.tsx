import React from "react";
import MovieCard from "../components/MovieCard";
import { Box, Container, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

const MyList: React.FC = () => {
  const favourites = useSelector(
    (state: RootState) => state.searchHistory.favourites
  );

  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4">Favourites</Typography>
      <MovieCard movies={favourites} />
    </Container>
  );
};

export default MyList;
