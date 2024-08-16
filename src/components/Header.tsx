import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{ display: "flex", alignItems: "center", gap: 3, paddingTop: 2 }}
    >
      <Box
        component="img"
        sx={{
          cursor: "pointer",
          height: 44,
          content: {
            xs: "url(image/icon-netflix.png)",
            md: "url(image/logo-netflix.png)",
          },
        }}
        onClick={() => navigate("/")}
      />
      <Typography
        sx={{ ":hover": { cursor: "pointer", textDecoration: "underline" } }}
      >
        Movies
      </Typography>
      <Typography
        sx={{ ":hover": { cursor: "pointer", textDecoration: "underline" } }}
      >
        TV Shows
      </Typography>
      <Typography
        onClick={() => navigate("/my-list")}
        sx={{ ":hover": { cursor: "pointer", textDecoration: "underline" } }}
      >
        My List
      </Typography>
    </Container>
  );
};

export default Header;
