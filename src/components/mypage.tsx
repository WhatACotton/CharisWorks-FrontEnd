import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Headers from "@mui/material/CardHeader";
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { LogOut } from "../lib/Server/Customer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CustomerGet } from "../lib/Server/Customer";
import {
  ContactStore,
  RegisteredStore,
  UserIDStore,
  loginState,
  EmailVerifiedStore,
  ZipCodeStore,
  AddressStore,
  CreatedDateStore,
  NameStore,
} from "./recoil/atoms";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
export default function Mypage() {
  const router = useRouter();
  const register = useRecoilValue(RegisteredStore);
  const [data, setData] = useRecoilState(loginState);
  const [UserID, setUserID] = useRecoilState(UserIDStore);
  const [Contact, setContact] = useRecoilState(ContactStore);
  const [EmailVerified, setEmailVerified] = useRecoilState(EmailVerifiedStore);
  const [Registered, setRegistered] = useRecoilState(RegisteredStore);
  const [CreatedDate, setCreatedDate] = useRecoilState(CreatedDateStore);
  const [Name, setName] = useRecoilState(NameStore);
  const [ZipCode, setZipCode] = useRecoilState(ZipCodeStore);
  const [Address, setAddress] = useRecoilState(AddressStore);
  // フェッチする非同期関数の例
  const fetchData = async () => {
    try {
      const response = await CustomerGet();
      if (response) {
        if (response.UserID == undefined) {
          setData("notlogin");
        } else {
          console.log(response);
          setData(response.UserID);
          setUserID(response.UserID);
          setContact(response.Contact);
          if (response.IsEmailVerified === true) {
            setEmailVerified("yes");
          } else {
            setEmailVerified("no");
          }
          if (response.IsRegistered === true) {
            setRegistered("yes");
          } else {
            setRegistered("no");
          }
          setCreatedDate(response.CreatedDate);
          setName(response.Name);
          setZipCode(response.ZipCode);
          setAddress(response.Address);
        }
        console.log(response.UserID);
      } else {
        setData("notlogin");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData(); // マウント時にデータをフェッチする
  console.log(data);
  return (
    <Container maxWidth="sm">
      <Grid justifyContent="space-between" container>
        <Grid>
          <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
            マイページ
          </Typography>
          <Typography variant="h5" gutterBottom>
            登録情報
          </Typography>
          <Typography gutterBottom>メールアドレス:{Contact}</Typography>
          <Typography variant="h6">登録状況</Typography>
          <Typography gutterBottom>
            本登録:{register}
            <br />
            Email認証:{EmailVerified}
            <br />
            アカウント作成日時:{CreatedDate}
          </Typography>
          <Typography variant="h6" gutterBottom>
            配送情報
          </Typography>
          <Typography gutterBottom>
            名前:{Name}様
            <br />
            住所:{ZipCode}
            <br />
            {Address}
          </Typography>
        </Grid>
        <Grid>
          {EmailVerified === "no" ? (
            <Button color="primary" variant="contained">
              <Typography variant="h6" noWrap>
                Email認証を送る
              </Typography>
            </Button>
          ) : (
            <></>
          )}
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              LogOut();
              router.push("/");
            }}
          >
            <Typography variant="h6" noWrap>
              ログアウト
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
