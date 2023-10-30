import Typography from "@mui/material/Typography";
import { CartCountContext } from "../lib/Contexts/CartContext";
import React from "react";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartCount = () => {
  const { CartCount, CartGets } = useContext(CartCountContext);

  console.log("Badge", CartCount);
  return (
    <>
      <Badge badgeContent={CartCount} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </>
  );
};
export default CartCount;
