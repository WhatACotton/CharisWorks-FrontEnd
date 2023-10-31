import React, { ReactNode, useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
type Login = boolean | null;

// Contextオブジェクトを生成する
export const IsLogInContext = createContext<{
  isLogin: Login;
  updateLoginStatus: () => Promise<void>;
}>({
  isLogin: false,
  updateLoginStatus: () => Promise.resolve(),
});
// 生成したContextオブジェクトのProviderを定義する
export const IsLogInProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLogin, setIsLogin] = useState<Login>(false);
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "true") {
      setIsLogin(true);
    } else {
      if (isLogin === "false") {
        setIsLogin(false);
      }
    }
  }, []);
  const updateLoginStatus = async () => {
    try {
      const res = await Cookies.get("SessionKey");
      if (res) {
        console.log(res?.length);
        if (res?.length > 110) {
          localStorage.setItem("isLogin", "true");
        } else {
          localStorage.setItem("isLogin", "false");
        }
      }
    } catch (error) {
      // エラーハンドリング
      console.error(error);
    }
  };

  return (
    <IsLogInContext.Provider value={{ isLogin, updateLoginStatus }}>
      {children}
    </IsLogInContext.Provider>
  );
};
