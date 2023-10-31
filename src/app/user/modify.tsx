import React from "react";
import { Container, CssBaseline } from "../../lib/mui";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import ModifyForm from "../../components/CustomerModifyForm";
const Modify = () => {
  return (
    <>
      <Topbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ModifyForm />
        <Footer />
      </Container>
    </>
  );
};
export default Modify;
