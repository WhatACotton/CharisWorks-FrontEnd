import {
  AddCircleIcon,
  Box,
  Button,
  RemoveCircleIcon,
  TextField,
  Typography,
} from "../../api/mui";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem, CartPost } from "../../api/Server/Customer";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { CartCountContext } from "../../api/Contexts/CartContext";
import { useState } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { ButtonGroup, Grid } from "@mui/material";
import { green } from "@mui/material/colors";
interface Props {
  ItemID: string | undefined;
  Stock: number | undefined;
}
interface IFormInput {
  Quantity: number;
}
const CartCount = (Carts: CartItem[], ItemID: string) => {
  for (const Item of Carts) {
    if (Item.ItemID === ItemID) {
      return Item.Quantity;
    }
  }
};
const CartChange = (Carts: CartItem[], ItemID: string, Quantity: number) => {
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
const CartDeleteItem = (Carts: CartItem[], ItemID: string) => {
  const newCarts: CartItem[] = [];
  for (const Item of Carts) {
    if (Item.ItemID !== ItemID) {
      newCarts.push(Item);
    }
  }
  return newCarts;
};
const CartUpdate = async (
  Carts: CartItem[] | null,
  Quantity: number,
  ItemID: string,
  stock: number | undefined
) => {
  console.log("update", Quantity);
  if (Quantity >= 0 && stock !== undefined) {
    if (Quantity <= stock) {
      let UpdatedCart: CartItem[] | undefined;
      if (Carts) {
        UpdatedCart = CartChange(Carts, ItemID, Quantity);
      } else {
        UpdatedCart = [{ ItemID, Quantity }];
      }
      if (UpdatedCart) {
        await CartPost(UpdatedCart);
        alert("カートに追加しました");
      }
      return UpdatedCart;
    } else {
      alert("在庫数を超えています。");
      return Carts;
    }
  } else {
    alert("1以上を入力してください。");
    return Carts;
  }
};
const CartButton = (Props: Props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>();
  const { Count, Carts, setCartsToLocalStorage } = useContext(CartCountContext);
  const [Quantity, setQuantity] = useState(1);
  const [CountState, setCountState] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const ItemID = useSearchParams().get("ItemID") ?? "";
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsInCart(true);
    const UpdatedCart: CartItem[] | null = await CartUpdate(
      Carts,
      Quantity,
      ItemID,
      Props.Stock
    );
    setCartsToLocalStorage(JSON.stringify(UpdatedCart));
    console.log("Button", Count);
    setCountState(Quantity);
  };

  useEffect(() => {
    const local = localStorage.getItem("Cart");
    console.log("local", local);
    try {
      if (local || local != undefined || local != null) {
        const c: CartItem[] = JSON.parse(local);
        const q = CartCount(c, ItemID);
        if (q) {
          setQuantity(q);
          setIsInCart(true);
          setCountState(q);
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
      <Grid container justifyContent={"center"}>
        <Grid item xs={12}>
          <Typography variant="h6" color={green[800]}>
            在庫あり
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: 2 }}>
          <ButtonGroup fullWidth>
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
            <Typography variant="h4" sx={{ pl: 1, pr: 1 }}>
              {Quantity}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (Props.Stock !== undefined) {
                  if (Quantity < Props.Stock) {
                    setQuantity(Quantity + 1);
                  }
                }
              }}
            >
              <AddCircleIcon />
            </Button>
          </ButtonGroup>
          <Typography variant="body2" sx={{ pt: 1 }}>
            在庫:{Props.Stock}個
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: 2 }}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            <ShoppingCartIcon />
            {isInCart ? "数量を変更する" : "カートに追加する"}
          </Button>
        </Grid>
        {isInCart ? (
          <>
            <Grid item xs={12} sx={{ pt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={async () => {
                  let UpdatedCart: CartItem[] | undefined;
                  if (Carts) {
                    UpdatedCart = CartDeleteItem(Carts, ItemID);
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
              {isInCart ? (
                <>
                  <Typography variant="body2" sx={{ pt: 1 }}>
                    カートに入っています。
                  </Typography>
                  <Typography variant="body2">
                    現在の数量:{CountState}
                  </Typography>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sx={{ pt: 2 }}>
              <Button
                disabled
                fullWidth
                variant="contained"
                color="primary"
                onClick={async () => {
                  let UpdatedCart: CartItem[] | undefined;
                  if (Carts) {
                    UpdatedCart = CartDeleteItem(Carts, ItemID);
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
            </Grid>
          </>
        )}
        <Typography sx={{ mt: 4 }} variant="body2">
          商品はカリスワークス本部から発送されます。
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={async () => {
            router.push("/mypage/cartlist");
          }}
        >
          カート一覧へ
        </Button>
      </Grid>
    </Box>
  );
};
export default CartButton;
export { CartCount, CartChange, CartDeleteItem, CartUpdate };
