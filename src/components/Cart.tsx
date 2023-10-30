import React, { useEffect, useState } from "react";
import { CartGet, CartItem, Purchase } from "../lib/Server/Customer";
import { useRouter } from "next/router";
import { Button, CheckIcon } from "../lib/mui";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
function Card({ cart }: { cart: CartItem }) {
  return (
    <>
      <Divider />
      <div className="card border-1">
        <p>ItemID: {cart.ItemID}</p>
        <p>Quantity: {cart.Quantity}</p>
        <p>Status: {cart.Status}</p>
        <p>ItemName: {cart.ItemName}</p>
        <p>Price: {cart.Price}</p>
        <p>Stock: {cart.Stock}</p>
      </div>
    </>
  );
}
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[] | string>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CartGet();
        if (data) {
          setCartItems(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  if (typeof cartItems === "object") {
    return (
      <div>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <h1>Cart List</h1>
          <div className="card-container">
            {cartItems.map((cart, index) => (
              <Card key={index} cart={cart} />
            ))}
          </div>
        </List>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Purchase().then((response) => {
              alert("購入ページに進みます");
              if (response) {
                router.push(response);
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

export default Cart;
