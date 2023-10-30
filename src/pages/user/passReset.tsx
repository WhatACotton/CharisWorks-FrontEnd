import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../lib/theme";
import PassReset from "../../app/user/passreset";
import { CartCountProvider } from "../../lib/Contexts/CartContext";
export default function SignUpPage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PassReset />
      </ThemeProvider>
    </CartCountProvider>
  );
}
