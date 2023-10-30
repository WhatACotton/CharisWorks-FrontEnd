import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../lib/theme";
import SignUp from "../../app/user/signup";
import { CartCountProvider } from "../../lib/Contexts/CartContext";
export default function SignUpPage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SignUp />
      </ThemeProvider>
    </CartCountProvider>
  );
}
