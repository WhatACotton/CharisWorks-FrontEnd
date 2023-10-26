import { Box, Button, TextField } from "../lib/mui";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { CartPost } from "../lib/Server/Customer";
import { SubmitHandler, useForm } from "react-hook-form";
interface Props {
  ItemID: string;
  Quantity: number;
}
interface IFormInput {
  Quantity: number;
}
const CartButton = (Props: Props) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    const carts: any = CartPost(Props.ItemID, Number(data.Quantity));
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
