import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Header";
import { ItemGetDetails } from "../lib/Server/ItemAPI";
import ExampleCarouselImage from "../components/ExampleCarouselImage";
import {
  Container,
  Grid,
  Typography,
  CardMedia,
  Card,
  Image,
  Box,
} from "../lib/mui";
import CartButton from "../components/Cart/CartButton";
import { CartCountProvider } from "../lib/Contexts/CartContext";
import { IsLogInProvider } from "../lib/Contexts/LogInContext";
import { useState, useEffect } from "react";
interface Props {
  ItemID: string | string[];
}
type Item = {
  ItemID: string;
  Name: string;
  Price: number;
  Stock: number;
  Series: string;
  Size: string;
  Color: string;
  Description: string;
  MakerName: string;
  MakerDescription: string;
};
const Item = ({ ItemID }: Props) => {
  const [Item, setItem] = useState<Item | null>(null);
  function getItem() {
    if (String(ItemID) !== "") {
      ItemGetDetails(ItemID.toString())
        .then((response) => {
          if (response) {
            const ItemData = response.Item;
            if (ItemData.ItemID !== undefined) {
              setItem(ItemData);
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
  useEffect(() => {
    getItem();
  }, [ItemID]);

  return (
    <>
      <Topbar />
      <Grid
        container
        spacing={2}
        sx={{ m: 3, p: 3, pr: 10 }}
        justifyContent={"space-between"}
      >
        <Grid item>
          <Image src={`images/${ItemID}.png`} />
        </Grid>
        <Grid item>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Typography variant="h3" gutterBottom>
              {Item?.Name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              価格: {Item?.Price}
            </Typography>
            <Typography variant="h5" gutterBottom>
              在庫: {Item?.Stock}
            </Typography>
            <Typography variant="h5" gutterBottom>
              シリーズ: {Item?.Series}
            </Typography>
            <Typography variant="h5" gutterBottom>
              サイズ: {Item?.Size}
            </Typography>
            <Typography variant="h5" gutterBottom>
              色: {Item?.Color}
            </Typography>
            <Typography variant="h5" gutterBottom>
              説明: {Item?.Description}
            </Typography>
            <Typography variant="h5" gutterBottom>
              メーカー: {Item?.MakerName}
            </Typography>
            <Typography variant="h5" gutterBottom>
              メーカー説明: {Item?.MakerDescription}
            </Typography>
          </Box>
          <IsLogInProvider>
            {Item?.Stock === null ? (
              <Typography variant="h5" gutterBottom>
                在庫がありません。
              </Typography>
            ) : (
              <>
                <CartButton ItemID={Item?.ItemID} Stock={Item?.Stock} />
              </>
            )}
          </IsLogInProvider>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default Item;
