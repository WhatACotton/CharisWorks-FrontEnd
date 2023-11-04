import React, { ReactNode, useState, createContext, useRef } from "react";
import { useEffect } from "react";
import { CartItem, Purchase } from "../../lib/Server/Customer";
type Count = number | null;
type CartItems = CartItem[] | null;
// Contextオブジェクトを生成する
export const CartCountContext = createContext<{
  Count: Count;
  Carts: CartItem[] | null;
  setItem: (Carts: string) => void;
}>({
  Count: null,
  Carts: null,
  setItem: () => {},
});
// 生成したContextオブジェクトのProviderを定義する

export const CartCountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [Count, setCartCount] = useState<Count>(null);
  const [Carts, setCarts] = useState<CartItems>(null);
  const setItem = (Carts: string) => {
    localStorage.setItem("Cart", Carts);
    setCartCount(JSON.parse(Carts)?.length);
  };
  useEffect(() => {
    const StringCarts = localStorage.getItem("Cart");
    if (StringCarts) {
      const Count = JSON.parse(StringCarts)?.length;
      const Carts: CartItems = JSON.parse(StringCarts);
      console.log("CartCountProvider Called", Carts);
      if (Count) {
        setCartCount(Number(Count));
      }
      if (Carts) {
        setCarts(Carts);
      }
    }
  }, []);

  return (
    <CartCountContext.Provider value={{ Carts, Count, setItem }}>
      {children}
    </CartCountContext.Provider>
  );
};
