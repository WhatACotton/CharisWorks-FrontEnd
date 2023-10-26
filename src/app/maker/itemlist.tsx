import * as React from "react";
import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";
import { Container, Typography, Grid, Button } from "../../lib/mui";
import MakerItem from "../../components/makerItem";
const ItemList = () => {
  return (
    <>
      <Topbar />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
          出品者管理画面
        </Typography>
        <Grid justifyContent="space-between" container></Grid>
        <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
          商品管理
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
          あなたの商品一覧
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            href="/maker/itemRegister"
          >
            商品を追加する
          </Button>
        </Typography>

        <MakerItem />
        <Footer />
      </Container>
    </>
  );
};

export default ItemList;
