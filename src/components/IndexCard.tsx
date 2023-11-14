import * as React from "react";
import {
  Grid,
  CardMedia,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "../api/mui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ItemGetALL } from "../api/Server/ItemAPI";
import { ItemData } from "../api/Server/ItemAPI";

const IndexCard = () => {
  const [Items, setItems] = useState<ItemData[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ItemGetALL();
        if (data) {
          setItems(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Grid container xs={10} spacing={1}>
        {Items.map((card, index) => (
          <Grid item key={index} xs={12} sm={12} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => router.push("/item?ItemID=" + card.ItemID)}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image={`images/${card.ItemID}/thumb.png`}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.Name}
                </Typography>
                <Typography>値段:{card.Price}</Typography>
                <Typography>在庫:{card.Stock}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => router.push("/item?ItemID=" + card.ItemID)}
                >
                  詳細
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default IndexCard;
