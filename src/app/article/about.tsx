import * as React from "react";
import Footer from "../../components/Footer";
import Topbar from "../../components/Header";
import { Container, Typography } from "../../lib/mui";
const About = () => {
  return (
    <>
      <Topbar />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
          Charis Worksについて
        </Typography>
        <Typography gutterBottom>
          皆さんはじめまして。このサイトを制作した、WhatACottonと申します。
        </Typography>
        <Footer />
      </Container>
    </>
  );
};
export default About;
