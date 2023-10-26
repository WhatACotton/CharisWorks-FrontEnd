import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../lib/theme";
import Item from "../app/Item";
import { useRouter } from "next/router";
import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import { useSearchParams } from "next/navigation";
export default function About() {
  const ItemID = useSearchParams().get("ItemID") ?? "";
  console.log(ItemID);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Item ItemID={ItemID} />
    </ThemeProvider>
  );
}
