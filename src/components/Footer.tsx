import * as React from "react";
import { Box, Container, Typography, Link } from "../api/mui";
const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="./top">
        Charis Works
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

interface FooterProps {
  description: string;
  title: string;
}

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Charis Works
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Made By WhatACotton
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};
export default Footer;
