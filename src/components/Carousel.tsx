import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setCourselIndex } from "../redux/slices/movieSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CarouselData, CarouselImage } from "../mui/styles";

const Carousel: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentIndex = useSelector(
    (state: RootState) => state.searchHistory.courselIndex
  );
  const movies = useSelector((state: RootState) => state.searchHistory.movies);
  const navigate = useNavigate();
  const validMovies = movies.filter((movie) => movie.background_image);

  useEffect(() => {
    if (validMovies.length > 0 && location.pathname === "/") {
      const interval = setInterval(() => {
        dispatch(setCourselIndex((currentIndex + 1) % validMovies.length));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [validMovies.length, currentIndex, dispatch, location.pathname]);

  const currentMovie = validMovies[currentIndex];

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "450px",
        overflow: "hidden",
        display: { sm: "block", xs: "none" },
      }}
    >
      <CarouselImage
        src={currentMovie.background_image}
        alt={`carousel-${currentIndex}`}
      />
      <CarouselData>
        <Typography
          sx={{
            fontSize: { lg: 36, md: 32, sm: 28, xs: 20 },
          }}
        >
          {currentMovie.title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ErrorOutlineIcon />}
          size="large"
          sx={{
            color: "#fff",
            padding: 1,
            fontWeight: 700,
            borderColor: "#fff",
          }}
          onClick={() => navigate(`/movie/${currentMovie.id}`)}
        >
          More Info
        </Button>
      </CarouselData>
    </Box>
  );
};

export default Carousel;
