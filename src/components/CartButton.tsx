import { Box, Button, TextField } from "../lib/mui";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { CartPost } from "../lib/Server/Customer";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { CartCountContext } from "../lib/Contexts/CartContext";
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
  const { CartCount, CartGets } = useContext(CartCountContext);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await CartPost(Props.ItemID, Number(data.Quantity));
    console.log(CartCount);
    await CartGets();
    alert("カートに追加しました");
    router.push("/");
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <TextField
        required
        fullWidth
        id="Quantity"
        label="数量"
        type="number"
        autoComplete="Quantity"
        {...register("Quantity")}
        variant="standard"
      />
      <Button variant="contained" color="primary" type="submit">
        <ShoppingCartIcon />
        カートに追加
      </Button>
    </Box>
  );
};
export default CartButton;
