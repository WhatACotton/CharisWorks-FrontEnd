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
import {Button} from "@mui/material";
import { Router, useRouter } from "next/router";
const ImageSlider = () => {
  const images = ["images/CharisTop.png"];
  const router = useRouter()
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="overlay">
        <Header />
        <Swiper slidesPerView={1}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
                <div className="calouselimage" key={index}>
                  <img
                    srcSet={`${image}`}
                    src={`${image}`}
                    alt={image}
                    loading="lazy"
                  />
                </div>
                <div className="text" key={index}>
                  <Typography >
                    CharisWorksは星回りや運勢にまつわる商品を販売しています。
                    </Typography>
                  <Typography >

                    様々なブレスレットをお楽しみください。
                    </Typography>
                    <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>
                      router.push("/showcase")}
                  >
                    商品を見に行く
                  </Button>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </ThemeProvider>
    </>
  );
};

export default ImageSlider;
