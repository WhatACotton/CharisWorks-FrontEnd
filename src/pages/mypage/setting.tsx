import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../api/theme";
import { CartCountProvider } from "../../api/Contexts/CartContext";
import { Typography } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container } from "../../api/mui";
import MypageContents from "../../components/MypageContents";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
const CardContents = [
  {
    title: "アカウントの削除",
    link: "/mypage/delete_account",
    description: "アカウントを削除します。",
    icon: <DeleteIcon fontSize="large" />,
  },
  {
    title: "配送先情報の修正",
    link: "/mypage/shipping_info/edit",
    description: "配送先情報が修正できます。",
    icon: <ModeEditIcon fontSize="large" />,
  },
];
export default function setting() {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Typography variant="h4">設定</Typography>
          <MypageContents CardContents={CardContents} />
        </Container>
        <Footer />
      </ThemeProvider>
    </CartCountProvider>
  );
}
