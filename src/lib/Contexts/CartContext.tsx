import React, { ReactNode, useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
import { CartGet } from "../Server/Customer";
type Count = number | null;

// Contextオブジェクトを生成する
export const CartCountContext = createContext<Count>(0);
// 生成したContextオブジェクトのProviderを定義する
export const CartCountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [CartCount, setCartCount] = useState<Count>(0);
  function CartGets() {
    CartGet().then((res) => {
      if (res !== undefined) {
        if (typeof res !== "string") {
          setCartCount(res.length);
        }
      }
    });
  }
  CartGets();
  return (
    <CartCountContext.Provider value={CartCount}>
      {children}
    </CartCountContext.Provider>
  );
};
