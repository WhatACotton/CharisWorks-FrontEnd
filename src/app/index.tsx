import * as React from "react";
import UncontrolledExample from "../components/UncontrolledExample";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import IndexCard from "../components/IndexCard";
import {
  GitHubIcon,
  TwitterIcon,
  FacebookIcon,
  Container,
  Grid,
  Box,
} from "../lib/mui";
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

const Index = () => {
  return (
    <>
      <Topbar />
      <UncontrolledExample />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={1}
          mt={3}
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <IndexCard />
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
    </>
  );
};
export default Index;
