import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MakerDetailsGet } from "../api/Server/Maker";
import { Container, Typography, Grid, Button } from "../api/mui";
const Maker = () => {
  const router = useRouter();
  const [Registered, setRegistered] = useState<boolean>(false);
  const [Role, setRole] = useState<string>("buyer");
  const [MakerName, setMakerName] = useState<string>("");
  const [MakerDescription, setMakerDescription] = useState<string>("");
  const fetchData = async () => {
    try {
      const response = await MakerDetailsGet();
      if (response) {
        const MakerData = response;
        if (MakerData.Maker.MakerName == "") {
          router.push("/signin");
          alert("権限がないためアクセスできません");
          setRole("buyer");
        } else {
          if (MakerData.Maker.MakerName == "preSeller") {
            setRole("preSeller");
          } else {
            setRole("Seller");
            if (MakerData.Maker.MakerName !== undefined) {
              setMakerName(MakerData.Maker.MakerName);
              setMakerDescription(MakerData.Maker.MakerDescription);
            } else {
            }
          }
        }
      } else {
        router.push("/signin");
        alert("ログインしてください");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (Role != "buyer") {
    return (
      <>
        <Topbar />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            出品者管理画面
          </Typography>
          <Grid justifyContent="space-between" container></Grid>
          {Role == "Seller" || Role == "admin" ? (
            <div>
              <p>MakerName: {MakerName}</p>
              <p>MakerDescription: {MakerDescription}</p>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                href="/maker/itemlist"
              >
                商品管理に進む
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                href="/maker/Modify"
              >
                出品者情報の修正
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href="/maker/createAccount"
            >
              出品者登録をする
            </Button>
          )}
          <Footer />
        </Container>
      </>
    );
  }
};
export default Maker;
