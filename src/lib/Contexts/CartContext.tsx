import React, { ReactNode, useState, createContext, useRef } from "react";
import { CartGet } from "../Server/Customer";
import { useEffect } from "react";
import { CartItem, Purchase } from "../../lib/Server/Customer";
type Count = number | null;
type CartItems = CartItem[] | null;
// Contextオブジェクトを生成する
export const CartCountContext = createContext<{
  Count: Count;
  Carts: CartItem[] | null;
  CartGets: () => Promise<void>;
}>({
  Count: null,
  Carts: null,
  CartGets: async () => {},
});
// 生成したContextオブジェクトのProviderを定義する

export const CartCountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [Count, setCartCount] = useState<Count>(null);
  const [Carts, setCarts] = useState<CartItems>(null);
  useEffect(() => {
    const StringCarts = localStorage.getItem("Cart");
    if (StringCarts) {
      const Count = JSON.parse(StringCarts)?.length;
      const Carts: CartItems = JSON.parse(StringCarts);
      console.log("CartCountProvider Called", Count);
      if (Count) {
        setCartCount(Number(Count));
      }
      if (Carts) {
        setCarts(Carts);
      }
    }
  }, []);
  const CartGets = async () => {
    try {
      const res = await CartGet();
      if (res !== undefined) {
        if (typeof res === "object") {
          console.log("CartGets Called", res.length);
          localStorage.setItem("Cart", JSON.stringify(res));
        } else {
          localStorage.setItem("Cart", "");
        }
      }
    } catch (error) {
      // エラーハンドリング
      console.error(error);
    }
  };

  return (
    <CartCountContext.Provider value={{ Carts, CartGets, Count }}>
      {children}
    </CartCountContext.Provider>
  );
};
