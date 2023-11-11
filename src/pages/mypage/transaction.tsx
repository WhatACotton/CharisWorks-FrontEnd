import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../lib/theme";
import Transaction from "../../app/user/transaction";
import { CartCountProvider } from "../../lib/Contexts/CartContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Container } from "../../lib/mui";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TransactionSection from "../../components/Transaction";

export default function SignUpPage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            取引履歴
          </Typography>
          <Grid justifyContent="space-between" container>
            <Grid></Grid>
          </Grid>
          <TransactionSection />
          <Footer />
        </Container>
      </ThemeProvider>
    </CartCountProvider>
  );
}
