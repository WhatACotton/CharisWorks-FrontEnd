import * as React from "react";
import { useForm } from "react-hook-form";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import { SignInServer } from "../../lib/Server/FireBase";
import { useRouter } from "next/router";
import fbinitialize from "../../lib/FireBase/firebaseConfig";
import { FireBaseGoogleSignIn } from "../../lib/FireBase/reqForFirebase";

import {
  Container,
  CssBaseline,
  Avatar,
  LockOutlinedIcon,
  Typography,
  Grid,
  Box,
  Button,
} from "../../lib/mui";
interface IFormInput {
  email: string;
  password: string;
}
// TODO remove, this demo shouldn't need to reset the theme.

const SignIn = () => {
  fbinitialize();
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
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
    </>
  );
};
export default SignIn;
