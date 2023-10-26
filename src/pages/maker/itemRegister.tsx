import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../lib/theme";
import { CssBaseline } from "@mui/material";
import ItemRegister from "../../app/maker/itemRegister";

export default function Mypage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ItemRegister />
    </ThemeProvider>
  );
}
