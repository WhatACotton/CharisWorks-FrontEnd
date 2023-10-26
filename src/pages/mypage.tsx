import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Mypage from "../app/mypage";
import { theme } from "../lib/theme";

export default function About() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Mypage />
    </ThemeProvider>
  );
}
