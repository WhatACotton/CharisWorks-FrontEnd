import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import React from "react";
import { Link } from "@mui/material";
import Header from "../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../api/theme";
const ImageSlider = () => {
  const images = [
    "https://source.unsplash.com/random?wallpapers",
    "https://source.unsplash.com/random?wallpapers",
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Swiper spaceBetween={10} slidesPerView={1}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Link href="/showcase">
                <img src={image} alt={`Slide ${index}`} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </ThemeProvider>
    </>
  );
};

export default ImageSlider;
