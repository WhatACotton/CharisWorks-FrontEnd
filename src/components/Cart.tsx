import React, { useEffect, useState } from "react";
import { CartGet, CartItem } from "../lib/Server/Customer";

const API_URL = process.env.NEXT_PUBLIC_IP_ADDRESS;

function Card({ cart }: { cart: CartItem }) {
  return (
    <div className="card border-1">
      <p>ItemID: {cart.ItemID}</p>
      <p>Quantity: {cart.Quantity}</p>
      <p>Status: {cart.Status}</p>
      <p>ItemName: {cart.ItemName}</p>
      <p>Price: {cart.Price}</p>
      <p>Stock: {cart.Stock}</p>
    </div>
  );
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  return (
    <div>
      <h1>Cart List</h1>
      <div className="card-container">
        {cartItems.map((cart, index) => (
          <Card key={index} cart={cart} />
        ))}
      </div>
    </div>
  );
}

export default Cart;
