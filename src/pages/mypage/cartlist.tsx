import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../lib/theme";
import { CartCountProvider } from "../../lib/Contexts/CartContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Grid, Typography } from "@mui/material";
import Cart from "../../components/Cart/Cart_List";

export default function SignUpPage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            カート確認
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
            現在カートに入っている商品を確認できます。
          </Typography>
          <Cart />
          <Footer />
        </Container>
      </ThemeProvider>
    </CartCountProvider>
  );
}
