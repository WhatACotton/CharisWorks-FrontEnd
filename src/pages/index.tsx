import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import React from "react";
import { Grid, Link, Typography } from "@mui/material";
import Header from "../components/Header";
import { ThemeProvider, makeStyles } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../api/theme";
import Head from "next/head";
import "../styles/imageoverlay.scss";
import zIndex from "@mui/material/styles/zIndex";

const ImageSlider = () => {
  const images = ["images/CharisTop.png"];

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="overlay">
        <Header />
        <Swiper slidesPerView={1}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Link href="/showcase">
                <div className="calouselimage" key={index}>
                  <img
                    srcSet={`${image}`}
                    src={`${image}`}
                    alt={image}
                    loading="lazy"
                  />
                </div>
                <div className="text" key={index}>
                  <Typography>test</Typography>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </ThemeProvider>
    </>
  );
};

export default ImageSlider;
