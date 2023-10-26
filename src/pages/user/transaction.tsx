import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../lib/theme";
import Transaction from "../../app/user/transaction";
export default function SignUpPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Transaction />
    </ThemeProvider>
  );
}
