import React, { ReactNode, useState, createContext, useRef } from "react";
import { CartGet } from "../Server/Customer";
import { useEffect } from "react";
type Count = number | null;

// Contextオブジェクトを生成する
export const CartCountContext = createContext<{
  CartCount: Count;
  CartGets: () => Promise<void>;
  setCartCount: React.Dispatch<React.SetStateAction<Count>>;
}>({
  CartCount: 0,
  CartGets: () => Promise.resolve(),
  setCartCount: () => {},
});
// 生成したContextオブジェクトのProviderを定義する

export const CartCountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [CartCount, setCartCount] = useState<Count>(0);
  useEffect(() => {
    const Carts = localStorage.getItem("CartCount");
    if (Carts) {
      const count = JSON.parse(Carts)?.length;
      console.log("CartCountProvider Called", count);
      if (count) {
        setCartCount(Number(count));
      }
    }
  }, []);
  const CartGets = async () => {
    try {
      const res = await CartGet();
      if (res !== undefined) {
        if (typeof res === "object") {
          console.log("CartGets Called", res.length);
          localStorage.setItem("CartCount", JSON.stringify(res));
        } else {
          localStorage.setItem("CartCount", String(0));
        }
      }
    } catch (error) {
      // エラーハンドリング
      console.error(error);
    }
  };

  return (
    <CartCountContext.Provider value={{ CartCount, CartGets, setCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
};
