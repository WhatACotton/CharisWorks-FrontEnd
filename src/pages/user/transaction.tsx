import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../lib/theme";
import Transaction from "../../app/user/transaction";
import { CartCountProvider } from "../../lib/Contexts/CartContext";
export default function SignUpPage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Transaction />
      </ThemeProvider>
    </CartCountProvider>
  );
}
