import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import About from "../../app/article/about";
import { theme } from "../../lib/theme";

export default function AboutPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <About />
    </ThemeProvider>
  );
}
