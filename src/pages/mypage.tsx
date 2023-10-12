import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Headers from "@mui/material/CardHeader";
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { RecoilRoot, useRecoilValue } from "recoil";
import { LogOut } from "../lib/Server/Customer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CustomerGet } from "../lib/Server/Customer";
import {
  AddressStore,
  ContactStore,
  CreatedDateStore,
  NameStore,
  ZipCodeStore,
  EmailVerifiedStore,
  RegisteredStore,
} from "../components/recoil/atoms";
import Mypage from "../components/mypage";

export default function About() {
  const defaultTheme = createTheme();
  return (
    <RecoilRoot>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Topbar />
        <Mypage />
      </ThemeProvider>
    </RecoilRoot>
  );
}
