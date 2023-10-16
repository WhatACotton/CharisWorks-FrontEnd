import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UncontrolledExample from "../components/UncontrolledExample";
import Sidebar from "../components/Sidebar";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PersonIcon from "@mui/icons-material/Person";
import Footer from "../components/Footer";
import Image from "next/image";
//const Charis_logo = require("../../public/images/icon.png");
//@ts-ignore
import Charis_logo from "../../public/images/icon.png";
import { CenterFocusStrong } from "@mui/icons-material";
import Topbar from "../components/Topbar";
import { RecoilRoot } from "recoil";
import { grey } from "@mui/material/colors";
import { ItemGetMaker } from "../lib/Server/ItemAPI";
const sidebar = {
  title: "Charis Worksとは",
  description:
    "Charis WorksはCharis Worker達の作品を販売しているwebサイトです。",
  archives: [{ title: "サービスをリリースします！", url: "#" }],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[300],
    },
  },
});
const defaultTheme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot>
        <Topbar />
      </RecoilRoot>
      <UncontrolledExample />

      <Container maxWidth="lg">
        <Grid container spacing={1} mt={3} justifyContent="space-between">
          <Grid container xs={8} spacing={1}>
            {cards.map((card) => (
              <Grid item key={card} xs={6}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container sx={{ mt: 3 }} md={4} xs={6}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </ThemeProvider>
  );
}
