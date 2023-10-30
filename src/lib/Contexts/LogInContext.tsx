import React, { ReactNode, useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
type LogIn = boolean | null;

// Contextオブジェクトを生成する
export const IsLogInContext = createContext<LogIn>(null);
// 生成したContextオブジェクトのProviderを定義する
export const IsLogInProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLogIn, setIsLogin] = useState<LogIn>(false);
  useEffect(() => {
    const cookie = Cookies.get("SessionKey");
    if (cookie == undefined) {
      console.log("invailed cookie");
      setIsLogin(false);
    } else {
      if (cookie.length > 110) {
        if (isLogIn === false) {
          setIsLogin(true);
          console.log("TRUE CALLED");
        }
      } else {
        if (isLogIn === true) {
          console.log("FALSE CALLED");
          setIsLogin(false);
        }
      }
    }
  }, [isLogIn]);
  const value: LogIn = isLogIn;
  return (
    <IsLogInContext.Provider value={value}>{children}</IsLogInContext.Provider>
  );
};
