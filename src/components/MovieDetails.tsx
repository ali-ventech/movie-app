import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Rating,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";

const MovieDetail: React.FC = () => {
  const { id } = useParams<string>();
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`
        );
        setMovie(response.data.data.movie);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Could not load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container>
        <Typography variant="h6">No movie details available.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {movie.title} ({movie.year})
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={movie.large_cover_image}
            alt={movie.title}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          {movie.yt_trailer_code && (
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
              title="Trailer"
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "300px", md: "400px" },
                borderRadius: 2,
                mb: 2,
              }}
              allowFullScreen
            ></Box>
          )}

          <Typography
            variant="body1"
            sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <strong>Rating:</strong> {movie.rating}{" "}
            <StarIcon sx={{ fill: "yellow" }} />
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Genres:</strong> {movie.genres.join(", ")}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetail;
