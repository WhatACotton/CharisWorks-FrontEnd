import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Grid, Link, ListItemButton, Typography } from "@mui/material";
import { CardHeader } from "react-bootstrap";
import { Card, CardContent } from "@mui/material";
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
type CardContents = {
  title: string;
  link: string;
  description: string;
};
interface Props {
  CardContents: CardContents[];
}
const MypageContents = (Props: Props) => {
  const CardContents = Props.CardContents;
  return (
    <>
      <Grid container spacing={3} sx={{ m: 3, p: 3, pr: 10 }}>
        {CardContents.map((card) => (
          <Grid item xs={6}>
            <Link href={card.link}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
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
