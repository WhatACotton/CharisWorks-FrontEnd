import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../api/theme";
import ItemList from "../../app/maker/itemlist";
import { CssBaseline } from "@mui/material";
import { CartCountProvider } from "../../api/Contexts/CartContext";

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
