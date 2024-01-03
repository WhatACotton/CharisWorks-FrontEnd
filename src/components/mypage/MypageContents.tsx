import React, { ReactElement, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Grid, Link, ListItemButton, Typography } from "@mui/material";
import { CardHeader } from "react-bootstrap";
import { Card, CardContent } from "@mui/material";
import { CartGet } from "../../api/Server/Customer";
import { CartCountProvider } from "../../api/Contexts/CartContext";
import { useContext } from "react";
import { CartCountContext } from "../../api/Contexts/CartContext";
import { GetCustomer } from "../../api/Server/Customer";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
type CardContents = {
  title: string;
  link: string;
  description: string;
  icon: ReactElement;
};
interface Props {
  CardContents: CardContents[];
}
const MypageContents = (Props: Props) => {
  const CardContents = Props.CardContents;
  return (
    <>
      <Grid container spacing={3} sx={{ m: 3, p: 3, pr: 10 }}>
        {CardContents.map((card, index) => (
          <Grid item key={index} xs={12} sm={12} md={6}>
            <Link href={card.link}>
              <Card>
                <CardContent>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item xs={8} sm={8} md={8}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                      {card.icon}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default MypageContents;
