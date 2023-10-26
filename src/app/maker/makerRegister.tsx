import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import fbinitialize from "../../lib/FireBase/firebaseConfig";
import { MakerRegister } from "../../lib/Server/Maker";
import { theme } from "../../lib/theme";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  ThemeProvider,
} from "../../lib/mui";

interface IFormInput {
  MakerName: string;
  MakerDescription: string;
}
// TODO remove, this demo shouldn't need to reset the theme.

const Register = () => {
  fbinitialize();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    MakerRegister(data.MakerName, data.MakerDescription);
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
            出品者登録
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
                  label="出品者の名前"
                  autoComplete="MakerName"
                  {...register("MakerName")}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Description"
                  label="出品者の説明"
                  type="description"
                  autoComplete="MakerDescription"
                  {...register("MakerDescription")}
                  variant="standard"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登録
            </Button>
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};
export default Register;
