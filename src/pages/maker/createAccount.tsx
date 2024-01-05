import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { LogOut } from "../../api/Server/Customer";
import { StripeAccountCreate } from "../../api/Server/Maker";

const StripeRedirectPage = () => {
  const router = useRouter();
  useEffect(() => {
    const fetchURL = async () => {
      const url = await StripeAccountCreate();
      router.push(url);
    };
    fetchURL();
  }, []);
  return (
    <>
      <p>リダイレクトしています...</p>
    </>
  );
};
export default StripeRedirectPage;
