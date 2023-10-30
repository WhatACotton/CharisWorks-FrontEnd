import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../lib/theme";
import ItemList from "../../app/maker/itemlist";
import { CssBaseline } from "@mui/material";
import { CartCountProvider } from "../../lib/Contexts/CartContext";

export default function Mypage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ItemList />
      </ThemeProvider>
    </CartCountProvider>
  );
}
