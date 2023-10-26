import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../lib/theme";
import SignUp from "../../app/user/signup";
export default function SignUpPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignUp />
    </ThemeProvider>
  );
}
