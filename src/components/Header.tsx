import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SmIcon from "../assets/icon-netflix.png";
import LgIcon from "../assets/logo-netflix.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  return (
    <Container
      sx={{ display: "flex", alignItems: "center", gap: 3, paddingTop: 2 }}
    >
      <Box
        component="img"
        sx={{
          cursor: "pointer",
          height: 44,
        }}
        src={isSmallScreen ? SmIcon : LgIcon}
        onClick={() => navigate("/")}
      />
      <Typography
        onClick={() => navigate("/")}
        sx={{ ":hover": { cursor: "pointer", textDecoration: "underline" } }}
      >
        Movies
      </Typography>
      <Typography
        onClick={() => navigate("/my-list")}
        sx={{ ":hover": { cursor: "pointer", textDecoration: "underline" } }}
      >
        My List
      </Typography>
      <Typography
        onClick={() => navigate("/add-movie")}
        sx={{ ":hover": { cursor: "pointer", textDecoration: "underline" } }}
      >
        Add Movie
      </Typography>
    </Container>
  );
};

export default Header;
