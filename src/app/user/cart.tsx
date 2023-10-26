import * as React from "react";
import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";
import { Container, Typography, Grid } from "../../lib/mui";
import Cart from "../../components/Cart";
const CartList = () => {
  return (
    <>
      <Topbar />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
          カート
        </Typography>
        <Grid justifyContent="space-between" container></Grid>
        <Cart />
        <Footer />
      </Container>
    </>
  );
};
export default CartList;
