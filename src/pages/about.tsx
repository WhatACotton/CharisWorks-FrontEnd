import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Headers from "@mui/material/CardHeader";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { RecoilRoot } from "recoil";
export default function About() {
  const defaultTheme = createTheme();

  return (
    <RecoilRoot>
      <ThemeProvider theme={defaultTheme}>
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
    </RecoilRoot>
  );
}
