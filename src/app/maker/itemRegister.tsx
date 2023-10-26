import * as React from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  CssBaseline,
} from "../../lib/mui";
import { useForm, SubmitHandler } from "react-hook-form";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import fbinitialize from "../../lib/FireBase/firebaseConfig";
import { PictureInput } from "../../components/pictureInputForm";
interface IFormInput {
  Name: string;
  Price: number;
  Stock: number;
  Series: string;
  Size: string;
  Color: string;
  Description: string;
}
import { useState } from "react";
import { ItemPost } from "../../lib/Server/Maker";
// TODO remove, this demo shouldn't need to reset the theme.

const ItemRegister = () => {
  fbinitialize();
  const { register, handleSubmit } = useForm<IFormInput>();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    ItemPost(
      data.Name,
      data.Price,
      data.Stock,
      data.Series,
      data.Size,
      data.Color,
      data.Description
    ).then((res) => {
      console.log(res);
      router.push("../mypage");
    });
  };

  return (
    <>
      <Topbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            商品の追加
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="商品名"
                  autoComplete="Name"
                  {...register("Name")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Price"
                  label="価格"
                  type="number"
                  autoComplete="Price"
                  {...register("Price")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Stock"
                  label="在庫"
                  type="number"
                  autoComplete="Stock"
                  {...register("Stock")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Series"
                  label="シリーズ"
                  autoComplete="Series"
                  {...register("Series")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Size"
                  label="サイズ"
                  autoComplete="Size"
                  {...register("Size")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Color"
                  label="色"
                  autoComplete="Color"
                  {...register("Color")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Description"
                  label="説明"
                  autoComplete="Description"
                  {...register("Description")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <PictureInput />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              追加する
            </Button>
          </Box>
        </Box>
        <Footer />
      </Container>
    </>
  );
};
export default ItemRegister;
