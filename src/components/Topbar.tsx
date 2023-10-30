import * as React from "react";

import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Button,
  Typography,
  ShoppingCartIcon,
} from "../lib/mui";
import { IsLogInProvider } from "../lib/Contexts/LogInContext";
import { Image } from "react-bootstrap";
import LogInStatus from "./LogInStatus";
import CartCount from "./CartCountStatus";
const Topbar = () => {
  const RegisterContext = React.createContext(false);

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
                <Image
                  src="/images/icon.png"
                  alt="Charis Works Logo"
                  width={50}
                  height={50}
                />
                <Typography variant="h6" color="inherit" noWrap sx={{ ml: 1 }}>
                  Charis Works
                </Typography>
              </Box>
            </Button>
          </Grid>

          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="inherit" href="/user/cartList">
                <CartCount />
              </Button>
              <Button color="inherit" href="../article/about">
                Charis Worksについて
              </Button>
              <IsLogInProvider>
                <LogInStatus />
              </IsLogInProvider>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Topbar;
