import {
  AddCircleIcon,
  Box,
  Button,
  RemoveCircleIcon,
  TextField,
  Typography,
} from "../lib/mui";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem, CartPost } from "../lib/Server/Customer";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { CartCountContext } from "../lib/Contexts/CartContext";
import { useState } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { ButtonGroup, Grid } from "@mui/material";
interface Props {
  ItemID: string;
  Quantity: number;
  Stock: number;
}
interface IFormInput {
  Quantity: number;
}

const CartButton = (Props: Props) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { Count, Carts, setCartsToLocalStorage } = useContext(CartCountContext);
  const [Quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const ItemID = useSearchParams().get("ItemID") ?? "";
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsInCart(true);
    update(Quantity);
  };
  const count = (Carts: CartItem[]) => {
    for (const Item of Carts) {
      if (Item.ItemID === ItemID) {
        return Item.Quantity;
      }
    }
  };
  const change = (Carts: CartItem[]) => {
    const newCarts: CartItem[] = [];
    const ItemList: string[] = [];
    if (Quantity !== 0) {
      for (const Item of Carts) {
        if (Item.ItemID === ItemID) {
          Item.Quantity = Quantity;
          if (!ItemList.includes(Item.ItemID)) {
            ItemList.push(Item.ItemID);
            newCarts.push(Item);
          }
        } else {
          newCarts.push(Item);
        }
      }
      if (!ItemList.includes(ItemID)) {
        newCarts.push({ ItemID, Quantity });
      }
    } else {
      for (const Item of Carts) {
        if (Item.ItemID !== ItemID) {
          newCarts.push(Item);
        }
      }
    }
    return newCarts;
  };
  const deleteItem = (Carts: CartItem[]) => {
    const newCarts: CartItem[] = [];
    for (const Item of Carts) {
      if (Item.ItemID !== ItemID) {
        newCarts.push(Item);
      }
    }
    return newCarts;
  };
  const update = async (Quantity: number) => {
    console.log("update", Quantity);
    if (Quantity >= 0) {
      if (Quantity < Props.Stock) {
        let UpdatedCart: CartItem[] | undefined;
        if (Carts) {
          UpdatedCart = change(Carts);
        } else {
          UpdatedCart = [{ ItemID, Quantity }];
        }
        if (UpdatedCart) {
          await CartPost(UpdatedCart);
        }
        setCartsToLocalStorage(JSON.stringify(UpdatedCart));
        alert("カートに追加しました");
        console.log("Button", Count);
      } else {
        alert("在庫数を超えています。");
      }
    } else {
      alert("1以上を入力してください。");
    }
  };
  useEffect(() => {
    const local = localStorage.getItem("Cart");
    console.log("local", local);
    try {
      if (local || local != undefined || local != null) {
        const c: CartItem[] = JSON.parse(local);
        const q = count(c);
        if (q) {
          setQuantity(q);
          setIsInCart(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [Props]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      {isInCart ? (
        <>
          <Typography variant="h6">カートに入っています。</Typography>
        </>
      ) : (
        <>
          <Typography variant="h6">カートに追加しますか？</Typography>
        </>
      )}
      <Grid container>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (Quantity > 1) {
                setQuantity(Quantity - 1);
              }
            }}
          >
            <RemoveCircleIcon />
          </Button>
          <Typography variant="h6" sx={{ p: 4 }}>
            {Quantity}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (Quantity < Props.Stock) {
                setQuantity(Quantity + 1);
              }
            }}
          >
            <AddCircleIcon />
          </Button>
        </ButtonGroup>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        <ShoppingCartIcon />
        {isInCart ? "数量を変更する" : "カートに追加する"}
      </Button>
      {isInCart ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              let UpdatedCart: CartItem[] | undefined;
              if (Carts) {
                UpdatedCart = deleteItem(Carts);
              }
              if (UpdatedCart) {
                await CartPost(UpdatedCart);
              }
              setCartsToLocalStorage(JSON.stringify(UpdatedCart));
              alert("カートから削除しました");
              console.log("Button", Count);
              setQuantity(1);
              setIsInCart(false);
            }}
          >
            カートから削除する
          </Button>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default CartButton;
