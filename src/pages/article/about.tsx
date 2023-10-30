import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import About from "../../app/article/about";
import { theme } from "../../lib/theme";
import { CartCountProvider } from "../../lib/Contexts/CartContext";

export default function AboutPage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <About />
      </ThemeProvider>
    </CartCountProvider>
  );
}
