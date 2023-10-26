import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../lib/theme";
import Maker from "../app/maker";

export default function About() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Maker />
    </ThemeProvider>
  );
}
