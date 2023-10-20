import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TestForm from "../components/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { FireBaseSignIn } from "../lib/FireBase/reqForFirebase";
import { SignIn } from "../lib/Server/FireBase";
import { useRouter } from "next/router";
import fbinitialize from "../lib/FireBase/firebaseConfig";
import { PictureInput } from "../components/pictureInputForm";
import { grey } from "@mui/material/colors";
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
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUpPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[800],
      },
      secondary: {
        main: grey[300],
      },
    },
  });
  fbinitialize();
  const { register, handleSubmit } = useForm<IFormInput>();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
              ログイン
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  <Link href="./signup" variant="body2">
                    アカウントを持っていませんか？新規登録
                  </Link>
                </Typography>
                <Typography variant="body2">
                  パスワードを忘れた方はこちら
                  <Link href="./passreset" variant="body2">
                    再設定
                  </Link>
                </Typography>{" "}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
