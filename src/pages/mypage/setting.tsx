import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../../api/theme";
import { CartCountProvider } from "../../api/Contexts/CartContext";
import { Typography } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container } from "../../api/mui";
import MypageContents from "../../components/mypage/MypageContents";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { CardMapping } from "../../components/mypage/MypageContents";
import { CustomerReq } from "../../api/Server/Customer";
import { useEffect } from "react";
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
  useEffect(() => {
    CustomerReq();
  }, []);
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Typography variant="h4" sx={{ pl: 10, pt: 5 }}>
            その他の設定
          </Typography>
          <CardMapping CardContents={CardContents} />
        </Container>
        <Footer />
      </ThemeProvider>
    </CartCountProvider>
  );
}
