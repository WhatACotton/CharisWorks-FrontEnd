import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { LogOut } from "../../lib/Server/Customer";
const LogOutPage = () => {
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      await LogOut();
      localStorage.setItem("isLogin", "false");
      router.push("/");
    };
    fetchData();
  }, []);
  return (
    <>
      <p>logouting...</p>
    </>
  );
};
export default LogOutPage;
