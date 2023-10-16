import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RecoilRoot, useRecoilValue } from "recoil";
import Mypage from "../components/mypage";
import { grey } from "@mui/material/colors";
export default function About() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[800],
      },
      secondary: {
        main: grey[300],
      },
    },
  });
  const defaultTheme = createTheme();
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
        <Mypage />
      </ThemeProvider>
    </RecoilRoot>
  );
}
