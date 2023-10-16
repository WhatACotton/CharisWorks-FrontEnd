import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Headers from "@mui/material/CardHeader";
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { LogOut } from "../lib/Server/Customer";
import { NextRouter, useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CustomerGet, TransactionGet } from "../lib/Server/Customer";
import TransactionSection from "../components/Transaction";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Cart from "../components/Cart";
export default function Mypage() {
  const router = useRouter();
  const defaultTheme = createTheme();

  return (
    <RecoilRoot>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Topbar />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            カート
          </Typography>
          <Grid justifyContent="space-between" container></Grid>
          <Cart />
          <Footer />
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
}
