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
import { CustomerGet, TransactionGet } from "../lib/Server/Customer";
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
  StripeAccountIDStore,
} from "./recoil/atoms";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { StripeAccountCreate } from "../lib/Server/Maker";
import { FireBaseSendEmailVerification } from "../lib/FireBase/reqForFirebase";
import fbinitialize from "../lib/FireBase/firebaseConfig";
fbinitialize();
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
  const [StripeAccountID, setStripeAccountID] =
    useRecoilState(StripeAccountIDStore);
  // フェッチする非同期関数の例
  const fetchData = async () => {
    try {
      const response = await CustomerGet();
      if (response) {
        if (response.UserID == undefined) {
          setData("notlogin");
          router.push("/signin");
          alert("ログインしてください");
        } else {
          window.localStorage.removeItem("idToken");
          console.log(response);
          if (response.IsRegistered === true) {
            setData(response.UserID);
            setUserID(response.UserID);
            setContact(response.Contact);
            if (response.IsEmailVerified === true) {
              setEmailVerified("yes");
            } else {
              setEmailVerified("no");
            }
            setCreatedDate(response.CreatedDate);
            setName(response.Name);
            setZipCode(response.ZipCode);
            setAddress(response.Address);
            if (response.StripeAccountID == undefined) {
              setStripeAccountID("not maker");
            } else {
              setStripeAccountID(response.StripeAccountID);
            }
          } else {
            alert("本登録に進みます。");
            router.push("/signup");
          }
        }
        console.log(response.UserID);
      } else {
        setData("notlogin");
        router.push("/signin");
        alert("ログインしてください");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData(); // マウント時にデータをフェッチする
  console.log(data);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
        マイページ
      </Typography>
      <Grid justifyContent="space-between" container>
        <Grid>
          <Typography variant="h5" gutterBottom>
            登録情報
          </Typography>
          <Typography gutterBottom>メールアドレス:{Contact}</Typography>
          <Typography variant="h6">登録状況</Typography>
          <Typography gutterBottom>
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
            {}
          </Button>
        </Grid>
        <Grid>
          {EmailVerified === "no" ? (
            <Grid>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  FireBaseSendEmailVerification();
                  alert("確認メールを送りました。");
                  router.push("/");
                }}
              >
                <Typography variant="h6" noWrap>
                  Email認証を送る
                </Typography>
              </Button>
            </Grid>
          ) : (
            <Grid>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  router.push("/transaction");
                }}
              >
                <Typography variant="h6" noWrap>
                  購入履歴の確認
                </Typography>
              </Button>
            </Grid>
          )}
          {StripeAccountID.startsWith("acct") ? (
            <Grid>
              <Button
                color="primary"
                variant="contained"
                onClick={async () => {
                  router.push("./maker");
                }}
              >
                <Typography variant="h6" noWrap>
                  出品者画面へ
                </Typography>
              </Button>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      {StripeAccountID === "Allow" ? (
        <Grid>
          <Typography variant="h6" gutterBottom>
            出品者登録が可能です。下記ボタンより出品者登録を行ってください。
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={async () => {
              const URL = await StripeAccountCreate();
              router.push(URL);
            }}
          >
            登録に進む
          </Button>
        </Grid>
      ) : (
        <></>
      )}

      <Footer />
    </Container>
  );
}
