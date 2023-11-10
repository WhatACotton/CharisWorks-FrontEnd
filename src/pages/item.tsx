import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../lib/theme";
import Item from "../components/Item";
import { useRouter } from "next/router";
import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import { useSearchParams } from "next/navigation";
import { CartCountProvider } from "../lib/Contexts/CartContext";
export default function ItemPage() {
  const ItemID = useSearchParams().get("ItemID") ?? "";
  console.log(ItemID);
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Item ItemID={ItemID} />
      </ThemeProvider>
    </CartCountProvider>
  );
}
