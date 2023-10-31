import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { ItemGetDetails } from "../lib/Server/ItemAPI";
import ExampleCarouselImage from "../components/ExampleCarouselImage";
import { Container, Grid, Typography } from "../lib/mui";
import CartButton from "../components/CartButton";
import { CartCountProvider } from "../lib/Contexts/CartContext";
import { IsLogInProvider } from "../lib/Contexts/LogInContext";
interface Props {
  ItemID: string | string[];
}
const Item = ({ ItemID }: Props) => {
  const [ItemName, setItemName] = React.useState<string>("");
  const [ItemPrice, setItemPrice] = React.useState<number>(0);
  const [ItemStock, setItemStock] = React.useState<number>(0);
  const [ItemSeries, setItemSeries] = React.useState<string>("");
  const [ItemSize, setItemSize] = React.useState<string>("");
  const [ItemColor, setItemColor] = React.useState<string>("");
  const [ItemDescription, setItemDescription] = React.useState<string>("");
  const [ItemMakerName, setItemMakerName] = React.useState<string>("");
  const [ItemMakerDescription, setItemMakerDescription] =
    React.useState<string>("");

  function getItem() {
    if (String(ItemID) !== "") {
      ItemGetDetails(ItemID.toString())
        .then((response) => {
          if (response) {
            const ItemData = response.Item;
            if (ItemData.ItemID !== undefined) {
              setItemName(ItemData.Name);
              setItemPrice(ItemData.Price);
              setItemStock(ItemData.Stock);
              setItemSeries(ItemData.Series);
              setItemSize(ItemData.Size);
              setItemColor(ItemData.Color);
              setItemDescription(ItemData.Description);
              setItemMakerName(ItemData.MakerName);
              setItemMakerDescription(ItemData.MakerDescription);
            } else {
              alert("商品が見つかりませんでした");
            }
          } else {
            alert("商品が見つかりませんでした");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  getItem();

  return (
    <>
      <Topbar />
      <ExampleCarouselImage text="aa" />
      <Container>
        <Grid container>
          <Grid item xs={12} md={6} justifyContent="space-between">
            <Typography variant="h3" gutterBottom>
              商品名: {ItemName}
            </Typography>
            <Typography variant="h5" gutterBottom>
              価格: {ItemPrice}
            </Typography>
            <Typography variant="h5" gutterBottom>
              在庫: {ItemStock}
            </Typography>
            <Typography variant="h5" gutterBottom>
              シリーズ: {ItemSeries}
            </Typography>
            <Typography variant="h5" gutterBottom>
              サイズ: {ItemSize}
            </Typography>
            <Typography variant="h5" gutterBottom>
              色: {ItemColor}
            </Typography>
            <Typography variant="h5" gutterBottom>
              説明: {ItemDescription}
            </Typography>
            <Typography variant="h5" gutterBottom>
              メーカー: {ItemMakerName}
            </Typography>
            <Typography variant="h5" gutterBottom>
              メーカー説明: {ItemMakerDescription}
            </Typography>
            <IsLogInProvider>
              <CartButton ItemID={ItemID.toString()} Quantity={1} />
            </IsLogInProvider>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
export default Item;
