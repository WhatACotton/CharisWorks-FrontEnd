import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import About from "../../app/article/about";
import { theme } from "../../api/theme";
import { CartCountProvider } from "../../api/Contexts/CartContext";

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
