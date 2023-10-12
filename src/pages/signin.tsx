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
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import fbinitialize from "../lib/FireBase/firebaseConfig";
import { FireBaseSignIn } from "../lib/FireBase/reqForFirebase";
import { SignIn } from "../lib/Server/FireBase";
interface IFormInput {
  email: string;
  password: string;
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInPage() {
  fbinitialize();
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();

  try {
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
      console.log(data);
      FireBaseSignIn(data.email, data.password)
        .then((idToken: string) => {
          console.log(idToken);
          SignIn(idToken)
            .then((res) => {
              console.log(res);
              router.push("/mypage");
            })
            .catch((error) => {
              console.log(error);
              throw new Error(error);
            });
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    };
    return (
      <RecoilRoot>
        <ThemeProvider theme={defaultTheme}>
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                ログイン
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
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password")}
                    />
                  </Grid>
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
                    <Link href="./signup" variant="body2">
                      アカウントを持っていませんか？今すぐ新規登録
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Footer />
          </Container>
        </ThemeProvider>
      </RecoilRoot>
    );
  } catch (error) {
    if (error === "") {
      const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
      return (
        <RecoilRoot>
          <ThemeProvider theme={defaultTheme}>
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  ログイン
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
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        {...register("email")}
                      />
                    </Grid>
                    <Typography variant="h6">{error}</Typography>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password")}
                      />
                    </Grid>
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
                      <Link href="./signup" variant="body2">
                        アカウントを持っていませんか？今すぐ新規登録
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Footer />
            </Container>
          </ThemeProvider>
        </RecoilRoot>
      );
    }
  }
}
