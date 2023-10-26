import Typography from "@mui/material/Typography";
import { IsLogInContext } from "../lib/Contexts/LogInContext";
import React from "react";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const LogInStatus = () => {
  const IsLogin = React.useContext(IsLogInContext);
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
