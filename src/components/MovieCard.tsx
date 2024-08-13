import React from "react";
import { Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMovieToHistory } from "../redux/slices/searchHistorySlice";

const MovieCard: React.FC<{ movie: any }> = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
    dispatch(addMovieToHistory(movie));
  };

  return (
    <Card onClick={handleCardClick}>
      <CardMedia
        className="movie-image"
        component="img"
        alt={movie.title}
        image={movie.medium_cover_image}
        sx={{
          transition: "transform .2s ease-in-out",
          margin: "0 auto",
          width: { xs: 100, sm: 120, md: 140, lg: 160 },
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Card>
  );
};

export default MovieCard;
