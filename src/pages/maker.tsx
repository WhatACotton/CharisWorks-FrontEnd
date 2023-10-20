import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Headers from "@mui/material/CardHeader";
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material";
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
import { theme } from "../lib/theme";

import MakerItem from "../components/makerItem";
export default function Mypage() {
  const router = useRouter();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            出品者管理画面
          </Typography>
          <Grid justifyContent="space-between" container></Grid>
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            商品管理
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            あなたの商品一覧
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            href="/itemRegister"
          >
            商品を追加する
          </Button>
          <MakerItem />
          <Footer />
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
}
