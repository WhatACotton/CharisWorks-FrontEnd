import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../lib/theme";
import CartList from "../../app/user/cart";
export default function SignUpPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartList />
    </ThemeProvider>
  );
}
