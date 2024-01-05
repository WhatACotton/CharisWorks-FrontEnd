import React, { use, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../api/theme";
import { CartCountProvider } from "../api/Contexts/CartContext";
import Router, { useRouter } from "next/router";
import MypageContents from "../components/mypage/MypageContents";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GetCustomer, Customer } from "../api/Server/Customer";
import { CartSave } from "../components/Cart/CartSave";

const CustomerReq = async () => {
  const response = await GetCustomer();
  if (response?.status == 200) {
    const CustomerData = await response.json();
    return CustomerData.Customer;
  }
  return null;
};
export default function Mypage() {
  const [Customer, setCustomer] = useState<Customer | null>();
  useEffect(() => {
    GetCustomer();
  }, []);
  const GetCustomer = async () => {
    const Customer = await CustomerReq();
    setCustomer(Customer);
    console.log(Customer);
    try {
      CartSave(Customer?.Cart.toString());
    } catch {}
    if (Customer == null) {
      alert("ログインしてください");
      Router.router?.push("/signin");
    }
  };
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <MypageContents Role={Customer?.Role} />
        <Footer />
      </ThemeProvider>
    </CartCountProvider>
  );
}
