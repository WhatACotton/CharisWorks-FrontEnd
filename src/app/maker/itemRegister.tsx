import * as React from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  CssBaseline,
} from "../../api/mui";
import { useForm, SubmitHandler } from "react-hook-form";
import Topbar from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { PictureInput } from "../../components/pictureInputForm";

import { useState } from "react";
import { ItemPost } from "../../api/Server/Maker";
import { PostItem } from "../../api/Server/Maker";
// TODO remove, this demo shouldn't need to reset the theme.

const ItemRegister = () => {
  const [NameError, setNameError] = useState("");
  const [PriceError, setPriceError] = useState("");
  const [StockError, setStockError] = useState("");
  const [SeriesError, setSeriesError] = useState("");
  const [SizeError, setSizeError] = useState("");
  const [ColorError, setColorError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");

  const NameCheck = (Name: string) => {
    if (Name != "") {
      setNameError("");
      return true;
    } else {
      setNameError("この欄は必須です。");
      return false;
    }
  };
  const PriceCheck = (Price: number) => {
    if (Price != 0) {
      setPriceError("");
      return true;
    } else {
      setPriceError("この欄は必須です。");
      return false;
    }
  };
  const StockCheck = (Stock: number) => {
    if (Stock != 0) {
      setStockError("");
      return true;
    } else {
      setStockError("この欄は必須です。");
      return false;
    }
  };
  const SeriesCheck = (Series: string) => {
    if (Series != "") {
      setSeriesError("");
      return true;
    } else {
      setSeriesError("この欄は必須です。");
      return false;
    }
  };
  const SizeCheck = (Size: string) => {
    if (Size != "") {
      setSizeError("");
      return true;
    } else {
      setSizeError("この欄は必須です。");
      return false;
    }
  };
  const ColorCheck = (Color: string) => {
    if (Color != "") {
      setColorError("");
      return true;
    } else {
      setColorError("この欄は必須です。");
      return false;
    }
  };
  const DescriptionCheck = (Description: string) => {
    if (Description != "") {
      setDescriptionError("");
      return true;
    } else {
      setDescriptionError("この欄は必須です。");
      return false;
    }
  };

  const { register, handleSubmit } = useForm<PostItem>();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const onSubmit: SubmitHandler<PostItem> = (data) => {
    console.log(data);
    if (
      NameCheck(data.Name) &&
      PriceCheck(data.Price) &&
      StockCheck(data.Stock) &&
      SeriesCheck(data.Series) &&
      SizeCheck(data.Size) &&
      ColorCheck(data.Color) &&
      DescriptionCheck(data.Description)
    ) {
      ItemPost(data)
        .then((res) => {
          console.log(res);
          router.push("../mypage");
        })
        .then((res) => {
          console.log(res);
          router.push("../mypage");
        });
    }
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
                  error={NameError ? true : false}
                  required
                  fullWidth
                  id="Name"
                  label="商品名"
                  autoComplete="Name"
                  helperText={NameError}
                  {...register("Name")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={PriceError ? true : false}
                  required
                  fullWidth
                  id="Price"
                  label="価格"
                  type="number"
                  autoComplete="Price"
                  helperText={PriceError}
                  {...register("Price")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={StockError ? true : false}
                  required
                  fullWidth
                  id="Stock"
                  label="在庫"
                  type="number"
                  autoComplete="Stock"
                  helperText={StockError}
                  {...register("Stock")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={SeriesError ? true : false}
                  required
                  fullWidth
                  id="Series"
                  label="シリーズ"
                  autoComplete="Series"
                  helperText={SeriesError}
                  {...register("Series")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={SizeError ? true : false}
                  required
                  fullWidth
                  id="Size"
                  label="サイズ"
                  autoComplete="Size"
                  helperText={SizeError}
                  {...register("Size")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={ColorError ? true : false}
                  required
                  fullWidth
                  id="Color"
                  label="色"
                  autoComplete="Color"
                  helperText={ColorError}
                  {...register("Color")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={DescriptionError ? true : false}
                  required
                  fullWidth
                  id="Description"
                  label="説明"
                  autoComplete="Description"
                  helperText={DescriptionError}
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
