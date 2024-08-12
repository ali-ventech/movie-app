import React from "react";
import { Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCard: React.FC<{ movie: any }> = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
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
          height: 250,
          width: "100%",
          objectFit: "cover",
        }}
      />
    </Card>
  );
};

export default MovieCard;
