import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../api/theme";
import { CssBaseline } from "@mui/material";
import ItemRegister from "../../app/maker/itemRegister";
import { CartCountProvider } from "../../api/Contexts/CartContext";

export default function Mypage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ItemRegister />
      </ThemeProvider>
    </CartCountProvider>
  );
}
