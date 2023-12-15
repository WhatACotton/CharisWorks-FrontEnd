import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { theme } from "../api/theme";
import { CartCountProvider } from "../api/Contexts/CartContext";
import Footer from "../components/Footer";
import Topbar from "../components/Header";
import { Container } from "../api/mui";
import { FireBaseGoogleSignIn } from "../api/FireBase/reqForFirebase";
import { useRouter } from "next/router";
import { SignInServer } from "../api/Server/FireBase";
import fbinitialize from "../api/FireBase/firebaseConfig";
import { useForm } from "react-hook-form";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
interface IFormInput {
  email: string;
  password: string;
}
export default function SignUpPage() {
  fbinitialize();

  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  return (
    <CartCountProvider>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ログイン
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container justifyContent="center">
                <Typography variant="body1" gutterBottom>
                  アカウントの作成・ログインにはgoogleアカウントの認証が必要です。
                </Typography>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      FireBaseGoogleSignIn().then((idToken) => {
                        if (!idToken) return;

                        SignInServer(idToken)
                          .then((res) => {
                            console.log(res);
                            router.push("/mypage");
                          })
                          .catch((error) => {
                            console.log(error);
                            throw new Error(error);
                          });
                      });
                    }}
                  >
                    <Typography variant="h6" noWrap>
                      google認証をする
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Footer />
        </Container>
      </ThemeProvider>
    </CartCountProvider>
  );
}
