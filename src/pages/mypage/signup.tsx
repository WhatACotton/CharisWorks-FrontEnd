import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../api/theme";
import { CartCountProvider } from "../../api/Contexts/CartContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SignUpForm from "../../components/signupForm";
import { Container } from "../../api/mui";
export default function SignUpPage() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <SignUpForm />
          <Footer />
        </Container>
      </ThemeProvider>
    </CartCountProvider>
  );
}
