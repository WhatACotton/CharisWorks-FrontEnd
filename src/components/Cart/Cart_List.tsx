import React, { Fragment, use, useEffect, useState } from "react";
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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import { CartCountContext } from "../../api/Contexts/CartContext";
import { GetCartDetails, Cart, CartDetails } from "../../api/Server/ItemAPI";
import CancelIcon from "@mui/icons-material/Cancel";
import { CartDeleteItem } from "./CartButton";
import { Alert, AlertTitle } from "@mui/material";
function CardContents({ cart }: { cart: CartDetails }) {
  const { Carts, Count, setCartsToLocalStorage } = useContext(CartCountContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (!Carts) return;
    const newCarts = CartDeleteItem(Carts, cart.ItemID);
    setCartsToLocalStorage(JSON.stringify(newCarts));
    handleClose();
  };

  return (
    <>
      {cart.ItemID ? (
        <>
          <Grid item xs={4} sm={4} md={4}>
            <Card>
              <CardContent>
                <Grid container justifyContent="space-between">
                  <Link href={`/item?ItemID=${cart.ItemID}`}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h6">{cart.Name}</Typography>
                      <Typography>値段：{cart.Price}</Typography>
                      <Typography>数量：{cart.Quantity}</Typography>
                    </Grid>
                  </Link>
                  <Grid item xs={1} sm={1} md={1}>
                    <Link onClick={handleClickOpen}>
                      <CancelIcon />
                    </Link>
                  </Grid>
                </Grid>
              </CardContent>
              <CardMedia
                component="img"
                height="140"
                image={`../../images/${cart.ItemID}/thumb.png`}
                alt={cart.Name}
              />
            </Card>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>確認</DialogTitle>
            <DialogContent>本当に削除しますか？</DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>キャンセル</Button>
              <Button onClick={handleDelete} autoFocus>
                削除
              </Button>
            </DialogActions>
          </Dialog>
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
  const { Carts, Count, setCartsToLocalStorage } = useContext(CartCountContext);
  const [CartDetails, setCartDetails] = useState<CartDetails[]>([]);
  const [Price, setPrice] = useState(0);
  const fetchData = async () => {
    try {
      console.log(Carts);
      if (Carts) {
        const response = await GetCartDetails(Carts);
        if (response) {
          setCartDetails(response.Cart);
          setPrice(0);
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
  }, [Count, setCartDetails]);

  if (typeof CartDetails === "object") {
    return (
      <div>
        <>
          <Grid container spacing={2}>
            {CartDetails ? (
              CartDetails.map((cart, index) => (
                <CardContents key={index} cart={cart} />
              ))
            ) : (
              <></>
            )}
          </Grid>
        </>
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
