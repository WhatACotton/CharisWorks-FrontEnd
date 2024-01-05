import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { LogOut } from "../../api/Server/Customer";
import { StripeAccountCreate } from "../../api/Server/Maker";
type res = {
  message: string;
  URL: string;
};
const StripeRedirectPage = () => {
  const fetchURL = async () => {
    const response = await StripeAccountCreate();
    const json = await response?.json();
    if (response?.status == 200) {
      await router.push(json.URL);
    } else {
      alert("エラーが発生しました");
      await router.push("/signin");
    }
  };
  const router = useRouter();
  useEffect(() => {
    fetchURL();
  }, []);
  return (
    <>
      <p>リダイレクトしています...</p>
    </>
  );
};
export default StripeRedirectPage;
