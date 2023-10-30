import React, { ReactNode, useState, createContext, useRef, use } from "react";
import { CartGet } from "../Server/Customer";
import { useEffect } from "react";
type Count = number | null;

// Contextオブジェクトを生成する
export const CartCountContext = createContext<{
  CartCount: Count;
  CartGets: () => Promise<void>;
}>({
  CartCount: 0,
  CartGets: () => Promise.resolve(),
});
// 生成したContextオブジェクトのProviderを定義する

export const CartCountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [CartCount, setCartCount] = useState<Count>(0);

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
    <CartCountContext.Provider value={{ CartCount, CartGets }}>
      {children}
    </CartCountContext.Provider>
  );
};
