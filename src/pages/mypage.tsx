import React, { use, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../api/theme";
import { CartCountProvider } from "../api/Contexts/CartContext";
import { useRouter } from "next/router";
import MypageContents from "../components/mypage/MypageContents";
import Header from "../components/Header";
import { Grid } from "@mui/material";
import Footer from "../components/Footer";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { CartSave } from "../components/Cart/CartSave";
type Customer = {
  UserID: string;
  Email: string;
  IsEmailVerified: boolean;
  CreatedDate: string;
  IsRegistered: boolean;
  Role: string;
  Name: string | null;
  ZipCode: string | null;
  Address1: string | null;
  Address2: string | null;
  Address3: string | null;
  PhoneNumber: string | null;
};
const CardContents = [
  {
    title: "登録情報の確認・修正",
    link: "/mypage/shipping_info",
    description: "住所などの配送に関する情報を確認・修正ができます。",
    icon: <PermIdentityOutlinedIcon fontSize="large" />,
  },
  {
    title: "取引履歴の確認",
    link: "/mypage/transaction",
    description: "現在発送中の取引や、過去の取引履歴を確認できます。",
    icon: <ReceiptLongOutlinedIcon fontSize="large" />,
  },
  {
    title: "ログアウト",
    link: "/mypage/logout",
    description: "ログアウトします。",
    icon: <LogoutIcon fontSize="large" />,
  },
  {
    title: "その他の設定",
    link: "/mypage/setting",
    description: "その他の設定を確認・変更できます。",
    icon: <SettingsIcon fontSize="large" />,
  },
];
export default function Mypage() {
  CartSave();
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <MypageContents CardContents={CardContents} />
        <Footer />
      </ThemeProvider>
    </CartCountProvider>
  );
}
