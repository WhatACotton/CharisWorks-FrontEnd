import * as React from "react";
import Grid from "@mui/material/Grid";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//@ts-ignore
import Charis_logo from "../../public/images/icon.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function Topbar() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const cookie = Cookies.get("SessionKey");
    console.log(cookie);
    if (cookie == undefined) {
      setIsLogin(false);
    } else {
      if (cookie.length > 110) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);

  return (
    <AppBar position="relative" color="secondary">
      <Toolbar>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Grid item alignItems="center">
            <Button href="/" color="inherit">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Image src={Charis_logo} alt="Charis Works Logo" width={50} />
                <Typography variant="h6" color="inherit" noWrap>
                  Charis Works
                </Typography>
              </Box>
            </Button>
          </Grid>

          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="inherit" href="./cart">
                <ShoppingCartIcon />
              </Button>
              <Button color="inherit" href="./about">
                Charis Worksについて
              </Button>

              <Grid>
                {isLogin === false ? (
                  <Button color="inherit" href="./signin">
                    <PersonIcon />
                    ログイン
                  </Button>
                ) : (
                  <Button color="inherit" href="./mypage">
                    <PersonIcon />
                    マイページ
                  </Button>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
