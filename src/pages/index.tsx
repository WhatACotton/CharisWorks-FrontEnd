import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../lib/theme";
import { CssBaseline } from "@mui/material";
import Index from "../app/index";
import { CartCountProvider } from "../lib/Contexts/CartContext";
export default function Mypage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Index />
      </ThemeProvider>
    </CartCountProvider>
  );
}
