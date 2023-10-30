import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Mypage from "../app/mypage";
import { theme } from "../lib/theme";
import { CartCountProvider } from "../lib/Contexts/CartContext";

export default function About() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Mypage />
      </ThemeProvider>
    </CartCountProvider>
  );
}
