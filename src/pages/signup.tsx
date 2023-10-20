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
import { useForm, SubmitHandler, set } from "react-hook-form";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { RecoilRoot } from "recoil";
import { FireBaseSignUp } from "../lib/FireBase/reqForFirebase";
import { useRouter } from "next/router";
import fbinitialize from "../lib/FireBase/firebaseConfig";
import { Input } from "reactstrap";
import { GetAddress } from "../lib/Address";
import SignUpForm from "../components/signupForm";
import { grey } from "@mui/material/colors";
interface IFormInput {
  name: string;
  zipcode: string;
  address: string;
  email: string;
  password: string;
}
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
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <SignUpForm />
          <Footer />
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
}
