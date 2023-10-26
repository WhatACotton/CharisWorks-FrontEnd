import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { useState } from "react";
import { MakerDetailsGet, MakerRegister } from "../../lib/Server/Maker";
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
import { theme } from "../../lib/theme";

interface IFormInput {
  MakerName: string;
  MakerDescription: string;
}
// TODO remove, this demo shouldn't need to reset the theme.

const Modify = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    MakerRegister(data.MakerName, data.MakerDescription).then(() => {
      router.push("/maker");
    });
  };
  try {
    async function fetchData() {
      const response = await MakerDetailsGet();
      console.log(response);
      if (response) {
        setMakerName(response.Maker.MakerName);
        setMakerDescription(response.Maker.MakerDescription);
      }
    }
    fetchData();
  } catch (e) {
    console.log(e);
  }
  const [MakerName, setMakerName] = useState<string>("");
  const [MakerDescription, setMakerDescription] = useState<string>("");

  return (
    <>
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
                    required
                    fullWidth
                    id="Name"
                    label="出品者の名前"
                    autoComplete="MakerName"
                    {...register("MakerName")}
                    variant="standard"
                    placeholder={MakerName}
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
                    placeholder={MakerDescription}
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
    </>
  );
};
export default Modify;
