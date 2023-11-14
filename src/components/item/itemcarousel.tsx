import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { Grid } from "@mui/material";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
export type Item = {
  img: string;
  title: string;
  order: number;
};
interface Props {
  ItemID: string | undefined;
}
export function Example(Props: Props) {
  const [ImageSrc, setImageSrc] = useState<string>("");
  const [order, setOrder] = useState<number>(0);
  const items: Item[] = [
    {
      img: `/images/${Props.ItemID}/main.png`,
      title: "image",
      order: 0,
    },
    {
      img: `/images/${Props.ItemID}/main2.png`,
      title: "image",
      order: 1,
    },
    {
      img: `/images/${Props.ItemID}/main3.png`,
      title: "image",
      order: 2,
    },
    {
      img: `/images/${Props.ItemID}/main4.png`,
      title: "image",
      order: 3,
    },
    {
      img: `/images/${Props.ItemID}/main5.png`,
      title: "image",
      order: 4,
    },
  ];

  return (
    <>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={2} sm={2} md={2}>
          <ImageList
            rowHeight={"auto"}
            sx={{ p: 1 }}
            gap={10}
            variant="standard"
            cols={1}
          >
            {items.map((item) => {
              if (item.order === order) {
                return (
                  <ImageListItem
                    key={item.img}
                    sx={{ border: 2, width: "80%" }}
                  >
                    <img
                      srcSet={`${item.img}`}
                      src={`${item.img}`}
                      alt={item.title}
                      loading="lazy"
                      onClick={() => setOrder(item.order)}
                    />
                  </ImageListItem>
                );
              } else {
                return (
                  <ImageListItem key={item.img} sx={{ width: "80%" }}>
                    <img
                      srcSet={`${item.img}`}
                      src={`${item.img}`}
                      alt={item.title}
                      loading="lazy"
                      onClick={() => setOrder(item.order)}
                    />
                  </ImageListItem>
                );
              }
            })}
          </ImageList>
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          {Props !== undefined && Props !== null && Props.ItemID !== "" ? (
            <>
              <Carousel
                navButtonsAlwaysVisible
                index={order}
                animation="slide"
                onChange={(now) => {
                  if (now !== undefined) {
                    setOrder(now);
                  }
                  console.log(now);
                }}
              >
                {items.map((item, i) => (
                  <Item key={i} ImageSrc={item.img} />
                ))}
              </Carousel>
            </>
          ) : (
            <>
              {" "}
              <Carousel
                navButtonsAlwaysVisible
                index={order}
                animation="slide"
                onChange={() => {
                  setOrder(order);
                }}
              >
                <CircularProgress />
              </Carousel>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
interface ItemProps {
  ImageSrc: string;
  key: number;
}
function Item(Props: ItemProps) {
  return (
    <Paper>
      <Image
        src={Props.ImageSrc}
        style={{ width: "100%", height: "auto" }}
        alt="image"
        width={500}
        height={500}
      />
    </Paper>
  );
}
