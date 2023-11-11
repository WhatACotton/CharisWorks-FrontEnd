import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Topbar from "../../components/Header";
import Footer from "../../components/Footer";
import fbinitialize from "../../lib/FireBase/firebaseConfig";
import { MakerRegister, MakerDetailsGet } from "../../lib/Server/Maker";
import { theme } from "../../lib/theme";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

const Modify = () => {
  const router = useRouter();
  const [MakerName, setMakerName] = useState("");
  const [MakerDescription, setMakerDescription] = useState("");
  const [MakerNameError, setMakerNameError] = useState("");
  const [MakerDescriptionError, setMakerDescriptionError] = useState("");
  fbinitialize();
  async function fetchData() {
    const response = await MakerDetailsGet();
    console.log(response);
    if (response) {
      setMakerName(response.Maker.MakerName);
      setMakerDescription(response.Maker.MakerDescription);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const MakerNameCheck = (Name: string) => {
    if (Name != "") {
      setMakerNameError("");
      return true;
    } else {
      setMakerNameError("この欄は必須です。");
      return false;
    }
  };
  const MakerDescriptionCheck = (MakerDescription: string) => {
    if (MakerDescription != "") {
      setMakerDescriptionError("");
      return true;
    } else {
      setMakerDescriptionError("この欄は必須です。");
      return false;
    }
  };
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = () => {
    try {
      if (
        MakerNameCheck(MakerName) &&
        MakerDescriptionCheck(MakerDescription)
      ) {
        MakerRegister(MakerName, MakerDescription);
        router.push("/maker");
      }
    } catch (e) {
      console.log(e);
    }
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
            出品者情報の修正
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
                  error={MakerNameError ? true : false}
                  fullWidth
                  variant="standard"
                  autoComplete="address"
                  value={MakerName}
                  helperText={MakerNameError}
                  label="出品者名"
                  {...register("MakerName")}
                  onChange={(e) => {
                    MakerNameCheck(e.target.value);
                    setMakerName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={MakerDescriptionError ? true : false}
                  fullWidth
                  variant="standard"
                  autoComplete="address"
                  value={MakerDescription}
                  helperText={MakerDescriptionError}
                  label="出品者の説明"
                  {...register("MakerDescription")}
                  onChange={(e) => {
                    MakerDescriptionCheck(e.target.value);
                    setMakerDescription(e.target.value);
                  }}
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
export default Modify;
