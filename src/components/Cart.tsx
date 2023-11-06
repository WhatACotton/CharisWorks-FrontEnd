import React, { use, useEffect, useState } from "react";
import { CartItem, Purchase } from "../lib/Server/Customer";
import { useRouter } from "next/router";
import { Button, CheckIcon } from "../lib/mui";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { CartCountContext } from "../lib/Contexts/CartContext";
import { GetCartDetails, Cart, CartDetails } from "../lib/Server/ItemAPI";
function Card({ cart }: { cart: CartDetails }) {
  return (
    <>
      <Divider />
      <div className="card border-1">
        {cart.ItemID ? (
          <>
            <p>ItemID: {cart.ItemID}</p>
            <p>Quantity: {cart.Quantity}</p>
            <p>Status: {cart.Status}</p>
            <p>ItemName: {cart.ItemName}</p>
            <p>Price: {cart.Price}</p>
            <p>Stock: {cart.Stock}</p>
          </>
        ) : (
          <>
            <Typography>エラーです。</Typography>
          </>
        )}
      </div>
    </>
  );
}
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
const CartDetails = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { Carts, Count } = useContext(CartCountContext);
  const [CartDetails, setCartDetails] = useState<CartDetails[]>([]);
  const fetchData = async () => {
    try {
      console.log(Carts);
      if (Carts) {
        const response = await GetCartDetails(Carts);
        if (response) {
          setCartDetails(response.Cart);
        }
        setCartItems(Carts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [Count]);

  if (typeof CartDetails === "object") {
    return (
      <div>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <h1>Cart List</h1>
          <div className="card-container">
            {CartDetails ? (
              CartDetails.map((cart, index) => <Card key={index} cart={cart} />)
            ) : (
              <></>
            )}
          </div>
        </List>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Purchase(cartItems).then((response) => {
              if (response?.url) {
                alert("購入ページに進みます");
                localStorage.removeItem("Cart");
                router.push(response.url);
              } else {
                alert("エラーが発生しました。");
              }
            });
          }}
        >
          <CheckIcon />
          購入する
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>カートが空です</h1>
      </div>
    );
  }
};

export default CartDetails;
