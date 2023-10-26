import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../lib/theme";
import { CssBaseline } from "@mui/material";
import MakerModify from "../../app/maker/makerModify";

export default function Mypage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MakerModify />
    </ThemeProvider>
  );
}
