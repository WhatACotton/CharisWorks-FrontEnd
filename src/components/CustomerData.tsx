import { Container, Grid, Typography, Button } from "../lib/mui";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CartCountContext } from "../lib/Contexts/CartContext";
import { Customer, CustomerGet } from "../lib/Server/Customer";
import React from "react";
import fbinitialize from "../lib/FireBase/firebaseConfig";
import { FireBaseSendEmailVerification } from "../lib/FireBase/reqForFirebase";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";
import { StripeAccountCreate } from "../lib/Server/Maker";
fbinitialize();

const CustomerData = ({ Customer: Customer }) => {
  const router = useRouter();
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
          <Typography gutterBottom>
            メールアドレス:{Customer.Contact}
          </Typography>
          <Typography variant="h6">登録状況</Typography>
          <Typography gutterBottom>
            Email認証:{Customer.IsEmailVerified}
            <br />
            アカウント作成日時:{Customer.CreatedDate}
          </Typography>
          <Typography variant="h6" gutterBottom>
            配送情報
          </Typography>
          <Typography gutterBottom>
            名前:{Customer.Name}様
            <br />
            住所:{Customer.ZipCode}
            <br />
            {Customer.Address1}
            <br />
            {Customer.Address2}
            <br />
            {Customer.Address3.replace(/&#(\d+);/g, (match, p1) =>
              String.fromCharCode(parseInt(p1, 10))
            )}
            <br />
            電話番号:{Customer.PhoneNumber}
          </Typography>
          <LogoutButton />
        </Grid>
        <Grid>
          {Customer.IsEmailVerified === false ? (
            <Grid>
              <Button
                color="primary"
                variant="contained"
                onClick={async () => {
                  await FireBaseSendEmailVerification();
                  await alert("確認メールを送りました。");
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
              <Link href="./user/transaction">
                <Button color="primary" variant="contained">
                  <Typography variant="h6" noWrap>
                    購入履歴の確認
                  </Typography>
                </Button>
              </Link>
              <Link href="./user/modify">
                <Button color="primary" variant="contained">
                  <Typography variant="h6" noWrap>
                    登録情報の修正
                  </Typography>
                </Button>
              </Link>
            </Grid>
          )}
          {Customer.StripeAccountID.startsWith("acct") ? (
            <Grid>
              <Button
                color="primary"
                variant="contained"
                onClick={async () => {
                  router.push("../maker");
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
      {Customer.StripeAccountID === "Allow" ? (
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
    </Container>
  );
};
export default CustomerData;
