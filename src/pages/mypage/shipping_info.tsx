import React, { use, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../../lib/theme";
import { CartCountProvider } from "../../lib/Contexts/CartContext";
import { GetCustomer } from "../../lib/Server/Customer";
import { useRouter } from "next/router";
import MypageContents from "../../components/MypageContents";
import Header from "../../components/Header";
import { Grid, Paper, Typography } from "@mui/material";
import { IsLogInProvider } from "../../lib/Contexts/LogInContext";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
type Customer = {
  UserID: string;
  Contact: string;
  IsEmailVerified: boolean;
  CreatedDate: string;
  IsRegistered: boolean;
  Role: string;
  Name: string | null;
  ZipCode: string | null;
  Address1: string | null;
  Address2: string | null;
  Address3: string | null;
  PhoneNumber: string | null;
};

export default function Mypage() {
  const [Customer, setCustomer] = React.useState<Customer | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetCustomer();
      if (response?.Customer) {
        setCustomer(response.Customer);
      } else {
        localStorage.setItem("isLogin", "false");
        alert("ログインしてください。");
        await router.push("/signin");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <IsLogInProvider>
      <CartCountProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <CssBaseline />
          <Container maxWidth="lg">
            {isLoading ? (
              <></>
            ) : Customer?.IsRegistered ? (
              <>
                <Typography variant="h4" component="h2" sx={{ margin: "20px" }}>
                  配送先情報
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 340,
                      }}
                    >
                      <Typography variant="h6" component="h3">
                        お名前
                      </Typography>
                      <Typography variant="body2" component="p" gutterBottom>
                        {Customer?.Name}
                      </Typography>

                      <Typography variant="h6" component="h3">
                        住所
                      </Typography>
                      <Typography variant="body2" component="p" gutterBottom>
                        〒{Customer?.ZipCode}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {Customer?.Address1}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {Customer?.Address2}
                      </Typography>
                      <Typography variant="body2" component="p" gutterBottom>
                        {Customer?.Address3?.replace(/&#(\d+);/g, (match, p1) =>
                          String.fromCharCode(parseInt(p1, 10))
                        )}
                      </Typography>
                      <Typography variant="h6" component="h3">
                        電話番号
                      </Typography>
                      <Typography variant="body2" component="p" gutterBottom>
                        {Customer?.PhoneNumber}
                      </Typography>
                      <Typography variant="h6" component="h3">
                        メールアドレス
                      </Typography>
                      <Typography variant="body2" component="p" gutterBottom>
                        {Customer?.Contact}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Button href="/mypage/shipping_info/edit" color="secondary">
                  配送先情報を編集する
                </Button>
              </>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ margin: "10px" }}
                    >
                      本登録がお済みでないようです。
                    </Typography>

                    <Button href="/mypage/signup" color="secondary">
                      本登録をする
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Container>
        </ThemeProvider>
      </CartCountProvider>
    </IsLogInProvider>
  );
}
