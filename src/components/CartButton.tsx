import { Box, Button, TextField, Typography } from "../lib/mui";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem, CartPost } from "../lib/Server/Customer";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { CartCountContext } from "../lib/Contexts/CartContext";
import Link from "next/link";
import { IsLogInContext } from "../lib/Contexts/LogInContext";
import { useState } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
interface Props {
  ItemID: string;
  Quantity: number;
}
interface IFormInput {
  Quantity: number;
}
const CartButton = (Props: Props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>();
  const { Count, Carts, setCartsToLocalStorage } = useContext(CartCountContext);
  const { isLogin } = useContext(IsLogInContext);
  const [Quantity, setQuantity] = useState(0);
  const ItemID = useSearchParams().get("ItemID") ?? "";
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    if (Carts) {
      await CartPost(Carts);
      setCartsToLocalStorage(JSON.stringify(Carts));
      alert("カートに追加しました");
      console.log("Button", Count);
    }

    router.push("/");
  };
  const count = (Carts: CartItem[]) => {
    for (const Item of Carts) {
      if (Item.ItemID === ItemID) {
        return Item.Quantity;
      }
    }
  };
  useEffect(() => {
    const local = localStorage.getItem("Cart");
    if (local || local != undefined) {
      const c: CartItem[] = JSON.parse(local);
      const q = count(c);
      if (q) {
        setQuantity(q);
      }
    }
  }, [Props]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <>
        <TextField
          required
          fullWidth
          id="Quantity"
          label="数量"
          type="number"
          autoComplete="Quantity"
          {...register("Quantity")}
          variant="standard"
          value={Quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          <ShoppingCartIcon />
          カートに追加
        </Button>
      </>
    </Box>
  );
};
export default CartButton;
