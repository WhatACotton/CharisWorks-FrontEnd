import * as React from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { LogOut } from "../lib/Server/Customer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CustomerGet } from "../lib/Server/Customer";
import { StripeAccountCreate } from "../lib/Server/Maker";
import { FireBaseSendEmailVerification } from "../lib/FireBase/reqForFirebase";
import fbinitialize from "../lib/FireBase/firebaseConfig";
import { Container, Typography, Grid, Button } from "../lib/mui";
import { CartCountContext } from "../lib/Contexts/CartContext";
import { useContext } from "react";
fbinitialize();
const Mypage = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [UserID, setUserID] = useState("");
  const [Contact, setContact] = useState("");
  const [EmailVerified, setEmailVerified] = useState("");
  const [CreatedDate, setCreatedDate] = useState("");
  const [Name, setName] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [Address, setAddress] = useState("");
  const [StripeAccountID, setStripeAccountID] = useState("");
  const { CartCount, CartGets, setCartCount } = useContext(CartCountContext);
  // フェッチする非同期関数の例
  useEffect(() => {
    fetchData();
  }),
    [];
  const fetchData = async () => {
    try {
      const response = await CustomerGet();
      const Customer = response?.Customer;
      const Cart = response?.Cart;
      if (Customer) {
        if (Customer.UserID == undefined) {
          BackToSignIn();
          return;
        } else {
          console.log(Customer);
          if (Customer.IsRegistered === true) {
            setData(Customer.UserID);
            setUserID(Customer.UserID);
            setContact(Customer.Contact);
            if (Customer.IsEmailVerified === true) {
              setEmailVerified("yes");
            } else {
              setEmailVerified("no");
            }
            setCreatedDate(Customer.CreatedDate);
            setName(Customer.Name);
            setZipCode(Customer.ZipCode);
            setAddress(Customer.Address);
            if (Customer.StripeAccountID == undefined) {
              setStripeAccountID("not maker");
            } else {
              setStripeAccountID(Customer.StripeAccountID);
            }
          } else {
            alert("本登録に進みます。");
            router.push("./user/signUp");
          }
        }
        console.log(Customer.UserID);
      }
      if (Cart) {
        localStorage.setItem("CartCount", String(Cart.length));
        setCartCount(Cart.length);
      } else {
        localStorage.removeItem("CartCount");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(data);
  function BackToSignIn() {
    setData("notlogin");
    router.push("./user/signIn");
    alert("ログインしてください");
  }
  return (
    <>
      <Topbar />
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
                localStorage.removeItem("CartCount");

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
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    router.push("./user/transaction");
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
    </>
  );
};
export default Mypage;
