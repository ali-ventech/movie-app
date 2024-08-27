import { Box, CircularProgress, Typography, styled } from "@mui/material";

export const Loader = styled(CircularProgress)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  height: 400,
  width: 400,
}));

export const NoTrailer = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: "#333",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  fontSize: 32,
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
  marginBottom: theme.spacing(2),
  height: "200px",
  [theme.breakpoints.up("sm")]: {
    height: "300px",
  },
  [theme.breakpoints.up("md")]: {
    height: "400px",
  },
}));

export const MovieData = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(0.5),
}));

export const CarouselImage = styled("img")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "auto",
  opacity: 0.6,
  transition: "opacity 1s ease-in-out",
}));

export const CarouselData = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "35%",
  left: "5%",
  opacity: 0.9,
  transition: "opacity 1s ease-in-out",
}));
