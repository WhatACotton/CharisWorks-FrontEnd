import Typography from "@mui/material/Typography";
import { CartCountContext } from "../lib/Contexts/CartContext";
import React, { use } from "react";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useEffect } from "react";
const CartCount = () => {
  const { Count } = useContext(CartCountContext);
  console.log("Badge", Count);

  return (
    <>
      {Count === 0 ? (
        <>
          <ShoppingCartIcon />
        </>
      ) : (
        <>
          <Badge badgeContent={Count} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </>
      )}
    </>
  );
};
export default CartCount;
