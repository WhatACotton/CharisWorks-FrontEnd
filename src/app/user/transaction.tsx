import * as React from "react";
import Footer from "../../components/Footer";
import Topbar from "../../components/Header";
import Container from "@mui/material/Container";
import TransactionSection from "../../components/Transaction";
import { Typography, Grid } from "../../api/mui";
const Transaction = () => {
  return (
    <>
      <Topbar />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
          取引履歴
        </Typography>
        <Grid justifyContent="space-between" container>
          <Grid></Grid>
        </Grid>
        <TransactionSection />
        <Footer />
      </Container>
    </>
  );
};

export default Transaction;
