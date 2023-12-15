import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../../api/theme";
import { CartCountProvider } from "../../api/Contexts/CartContext";
import Footer from "../../components/Footer";
import Topbar from "../../components/Header";
import { Container, Typography } from "../../api/mui";
export default function AboutPage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            Charis Worksについて
          </Typography>
          <Typography gutterBottom>
            皆さんはじめまして。このサイトを制作した、WhatACottonと申します。
          </Typography>
          <Footer />
        </Container>
      </ThemeProvider>
    </CartCountProvider>
  );
}
