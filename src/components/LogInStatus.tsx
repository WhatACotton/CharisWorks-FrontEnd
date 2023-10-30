import Typography from "@mui/material/Typography";
import { IsLogInContext } from "../lib/Contexts/LogInContext";
import React from "react";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
const LogInStatus = () => {
  const IsLogin = useContext(IsLogInContext);
  return (
    <div>
      {IsLogin === false ? (
        <Button color="inherit" href="./user/signIn">
          <PersonIcon />
          ログイン
        </Button>
      ) : (
        <Button color="inherit" href="../mypage">
          <PersonIcon />
          マイページ
        </Button>
      )}
    </div>
  );
};
export default LogInStatus;
