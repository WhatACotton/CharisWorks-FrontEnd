import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../api/theme";
import { CssBaseline } from "@mui/material";
import MakerModify from "../../app/maker/makerModify";
import { CartCountProvider } from "../../api/Contexts/CartContext";

export default function Mypage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MakerModify />
      </ThemeProvider>
    </CartCountProvider>
  );
}
