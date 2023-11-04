import { Button, Typography } from "../lib/mui";
import React from "react";
import { LogOut } from "../lib/Server/Customer";
import { useRouter } from "next/router";
const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={() => {
        LogOut();
        localStorage.removeItem("Cart");

        router.push("/");
      }}
    >
      <Typography variant="h6" noWrap>
        ログアウト
      </Typography>
      {}
    </Button>
  );
};
export default LogoutButton;
