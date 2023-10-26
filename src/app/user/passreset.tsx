import * as React from "react";
import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";
import { useForm, SubmitHandler } from "react-hook-form";
import { FireBaseSendPassResetEmail } from "../../lib/FireBase/reqForFirebase";
import fbinitialize from "../../lib/FireBase/firebaseConfig";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  TextField,
  Box,
  Grid,
  Button,
} from "../../lib/mui";
interface IFormInput {
  email: string;
}
const PassReset = () => {
  fbinitialize();
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    FireBaseSendPassResetEmail(data.email).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  };
  return (
    <>
      <Topbar />
      <Container component="main" maxWidth="xs">
        <Typography gutterBottom sx={{ mt: 5 }}>
          パスワードをリセットします。
          <br />
          リセットするメールアドレスを入力してください。
        </Typography>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                router.push("/");
                alert("メールを送信しました。");
              }}
            >
              送信
            </Button>
          </Box>
        </Grid>

        <Grid justifyContent="space-between" container></Grid>
        <Footer />
      </Container>
    </>
  );
};
export default PassReset;
