import React, { use, useEffect, useState } from "react";
import { CartItem, Purchase } from "../../api/Server/Customer";
import { useRouter } from "next/router";
import { Button, CheckIcon, Card } from "../../api/mui";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  CardContent,
  CardMedia,
  Grid,
  Link,
} from "@mui/material";
import { useContext } from "react";
import { CartCountContext } from "../../api/Contexts/CartContext";
import { GetCartDetails, Cart, CartDetails } from "../../api/Server/ItemAPI";
function CardContents({ cart }: { cart: CartDetails }) {
  return (
    <>
      {cart.ItemID ? (
        <>
          <Grid item xs={12} sm={12} md={6}>
            <Link href={`/item?ItemID=${cart.ItemID}`}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{cart.Name}</Typography>
                  <Typography>値段：{cart.Price}</Typography>
                  <Typography>数量：{cart.Quantity}</Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="140"
                  image={`../../images/${cart.ItemID}/thumb.png`}
                  alt={cart.Name}
                />
              </Card>
            </Link>
          </Grid>
        </>
      ) : (
        <>
          <Typography>エラーです。</Typography>
        </>
      )}
    </>
  );
}
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
const CartDetails = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { Carts, Count } = useContext(CartCountContext);
  const [CartDetails, setCartDetails] = useState<CartDetails[]>([]);
  const [Price, setPrice] = useState(0);
  const fetchData = async () => {
    try {
      console.log(Carts);
      if (Carts) {
        const response = await GetCartDetails(Carts);
        if (response) {
          setCartDetails(response.Cart);
          for (let i = 0; i < response.Cart.length; i++) {
            setPrice(
              (prev) =>
                prev + response.Cart[i].Price * response.Cart[i].Quantity
            );
          }
        }
        setCartItems(Carts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [Count]);

  if (typeof CartDetails === "object") {
    return (
      <div>
        <Grid container xs={10} spacing={1}>
          <>
            {CartDetails ? (
              CartDetails.map((cart, index) => (
                <CardContents key={index} cart={cart} />
              ))
            ) : (
              <></>
            )}
          </>
        </Grid>
        <Divider sx={{ mt: 3 }} />
        <Typography variant="h6">合計金額：{Price}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Purchase(cartItems).then((response) => {
              if (response?.url) {
                alert("購入ページに進みます");
                localStorage.removeItem("Cart");
                router.push(response.url);
              } else {
                alert("エラーが発生しました。");
              }
            });
          }}
        >
          <CheckIcon />
          購入する
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>カートが空です</h1>
      </div>
    );
  }
};

export default CartDetails;
