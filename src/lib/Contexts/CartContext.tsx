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
    const count = localStorage.getItem("CartCount");
    if (count) {
      setCartCount(Number(count));
    }
  }, []);
  const CartGets = async () => {
    try {
      const res = await CartGet();
      if (res !== undefined) {
        if (typeof res !== "string") {
          console.log("CartGets Called", res.length);
          localStorage.setItem("CartCount", String(res.length));
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
