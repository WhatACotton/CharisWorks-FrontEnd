import React, { ReactNode, useState, createContext, useRef } from "react";
import { useEffect } from "react";
import { CartItem, Purchase } from "../../lib/Server/Customer";
type Count = number | null;
type CartItems = CartItem[] | null;
// Contextオブジェクトを生成する
export const CartCountContext = createContext<{
  Count: Count;
  Carts: CartItem[] | null;
  setCartsToLocalStorage: (Carts: string) => void;
}>({
  Count: null,
  Carts: null,
  setCartsToLocalStorage: () => {},
});
// 生成したContextオブジェクトのProviderを定義する

export const CartCountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isNull, setIsNull] = useState<boolean>(true);
  const [Count, setCartCount] = useState<Count>(null);
  const [Carts, setCarts] = useState<CartItems>(null);
  const setCartsToLocalStorage = (Carts: string) => {
    localStorage.setItem("Cart", Carts);
    setCartCount(JSON.parse(Carts)?.length);
    setCarts(JSON.parse(Carts));
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
        setIsNull(true);
      } else {
        setIsNull(false);
      }
    }
  }, []);

  return (
    <CartCountContext.Provider value={{ Carts, Count, setCartsToLocalStorage }}>
      {children}
    </CartCountContext.Provider>
  );
};
