import * as React from "react";
import Footer from "../Footer";
import Topbar from "../Header";
import { ItemGetDetails } from "../../api/Server/ItemAPI";
import {
  Container,
  Grid,
  Typography,
  CardMedia,
  Card,
  Box,
} from "../../api/mui";
import Divider from "@mui/material/Divider";
import CartButton from "../Cart/CartButton";
import { CartCountProvider } from "../../api/Contexts/CartContext";
import { IsLogInProvider } from "../../api/Contexts/LogInContext";
import { useState, useEffect } from "react";
import { Chip, List, ListItem, ListItemText, Paper } from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import { Example } from "./itemcarousel";
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
  const [ImageSrc, setImageSrc] = useState<string>("");
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
    setImageSrc(`/images/${ItemID}/main.png`);
  }, [ItemID]);
  const itemData = [
    {
      img: `/images/${ItemID}/main.png`,
      title: "image",
    },
    {
      img: `/images/${ItemID}/main2.png`,
      title: "image",
    },
    {
      img: `/images/${ItemID}/main3.png`,
      title: "image",
    },
    {
      img: `/images/${ItemID}/main4.png`,
      title: "image",
    },
    {
      img: `/images/${ItemID}/main5.png`,
      title: "image",
    },
  ];

  return (
    <>
      <Topbar />
      <Grid spacing={1} justifyContent={"center"} container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={5}>
          <Card sx={{ p: 3 }}>
            <Grid container justifyContent={"space-between"}>
              <Example ItemID={Item?.ItemID} />
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={4}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <Typography variant="h4">{Item?.Name}</Typography>
              <Typography variant="body2" gutterBottom>
                by {Item?.MakerName}
              </Typography>
              <Divider />
              <Typography variant="h4" gutterBottom sx={{ mt: 1, p: 1 }}>
                ¥{Item?.Price}-
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="シリーズ" secondary={Item?.Series} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="サイズ" secondary={Item?.Size} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="カラー" secondary={Item?.Color} />
                </ListItem>
              </List>
              <Divider sx={{ mt: 2 }} />
              <Paper sx={{ p: 2, mt: 2 }}>{Item?.Description}</Paper>

              <Card sx={{ mt: 3, p: 2 }} variant="outlined">
                <Grid container justifyContent={"space-between"}>
                  <Grid item>
                    <Typography gutterBottom variant="h6">
                      出品者について
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="h6">
                      {Item?.MakerName}
                    </Typography>
                  </Grid>
                </Grid>
                <Paper sx={{ p: 2, mt: 2 }}>{Item?.MakerDescription}</Paper>
              </Card>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <IsLogInProvider>
              <Typography variant="h5" gutterBottom>
                {Item?.Stock === null ? "在庫がありません。" : ""}
              </Typography>
              <CartButton ItemID={Item?.ItemID} Stock={Item?.Stock} />
            </IsLogInProvider>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default Item;
