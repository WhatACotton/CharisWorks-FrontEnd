import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../api/theme";
import Maker from "../app/maker";
import { CartCountProvider } from "../api/Contexts/CartContext";

export default function About() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Maker />
      </ThemeProvider>
    </CartCountProvider>
  );
}
