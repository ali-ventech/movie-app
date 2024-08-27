import React from "react";
import {
  Card,
  CardMedia,
  Checkbox,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addMovieToHistory, addToFavourites } from "../redux/slices/movieSlice";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Movie } from "../types.ts/movieType";

interface MovieCardProps {
  movies: Movie[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movies }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favourites = useSelector(
    (state: RootState) => state.searchHistory.favourites
  );

  const handleCardClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
    dispatch(addMovieToHistory(movie));
  };

  const handleIconClick = (movie: Movie) => {
    dispatch(addToFavourites(movie));
  };

  return (
    <ImageList
      sx={{
        display: "flex",
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
            transition: "transform 0.3s, height 0.3s",
            "&:hover": {
              transform: "scale(1.12)",
              zIndex: 1,
              cursor: "pointer",
            },
          }}
        >
          <Card sx={{ position: "relative" }}>
            <CardMedia
              className="movie-image"
              component="img"
              alt={movie.title}
              image={movie.medium_cover_image}
              sx={{
                transition: "transform .2s ease-in-out",
                margin: "0 auto",
                width: { xs: 100, sm: 120, md: 140, lg: 160 },
                height: { xs: 150, sm: 180, md: 210, lg: 240 },
                objectFit: "cover",
              }}
              onClick={() => handleCardClick(movie)}
            />
            <Checkbox
              sx={{ position: "absolute", top: 2, right: 2, zIndex: 10 }}
              size="medium"
              icon={<Favorite sx={{ fill: "#AAAAAA" }} />}
              checkedIcon={<Favorite sx={{ fill: "#E34234" }} />}
              // checked={favourites.includes(movie)}
              checked={favourites.some((fav) => fav.id === movie.id)}
              onChange={() => handleIconClick(movie)}
            />
          </Card>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default MovieCard;
