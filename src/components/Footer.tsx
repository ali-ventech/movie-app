import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Movie App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
