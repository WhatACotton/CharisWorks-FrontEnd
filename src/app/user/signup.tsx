import * as React from "react";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import SignUpForm from "../../components/signupForm";
import { Container, CssBaseline } from "../../lib/mui";
// TODO remove, this demo shouldn't need to reset the theme.

const SignUp = () => {
  return (
    <>
      <Topbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <SignUpForm />
        <Footer />
      </Container>
    </>
  );
};
export default SignUp;
