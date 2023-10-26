import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../lib/theme";
import ItemList from "../../app/maker/itemlist";
import { CssBaseline } from "@mui/material";

export default function Mypage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ItemList />
    </ThemeProvider>
  );
}
