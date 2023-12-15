import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import React from "react";
import { Link } from "@mui/material";
import Header from "../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../api/theme";
import Head from "next/head";
const ImageSlider = () => {
  const images = ["images/CharisTop.png"];

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Swiper slidesPerView={1}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Link href="/showcase">
                <img
                  srcSet={`${image}`}
                  src={`${image}`}
                  alt={image}
                  loading="lazy"
                  width="100%"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </ThemeProvider>
    </>
  );
};

export default ImageSlider;
