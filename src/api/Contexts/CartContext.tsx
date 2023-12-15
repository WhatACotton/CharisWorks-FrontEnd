import React, { ReactNode, useState, createContext, useRef } from "react";
import { useEffect } from "react";
import { CartItem, Purchase } from "../../api/Server/Customer";
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
    if (Carts !== null) {
      console.log("setCartsToLocalStorage", Carts);
      let Count = 0;
      for (const Item of JSON.parse(Carts)) {
        Count += Item.Quantity;
      }
      localStorage.setItem("Cart", Carts);
      setCartCount(Number(Count));
      setCarts(JSON.parse(Carts));
    }
  };

  useEffect(() => {
    const StringCarts = localStorage.getItem("Cart");
    if (StringCarts) {
      let Count = 0;
      try {
        for (const Item of JSON.parse(StringCarts)) {
          Count += Item.Quantity;
        }
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
      } catch (e) {}
    }
  }, []);

  return (
    <CartCountContext.Provider value={{ Carts, Count, setCartsToLocalStorage }}>
      {children}
    </CartCountContext.Provider>
  );
};
