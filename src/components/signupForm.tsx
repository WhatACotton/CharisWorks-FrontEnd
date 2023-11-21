import * as React from "react";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import { Register } from "../api/Server/FireBase";
import { useRouter } from "next/router";
import fbinitialize from "../api/FireBase/firebaseConfig";
import { GetAddress } from "../api/Address";
import { useState } from "react";
import {
  Box,
  Avatar,
  LockOutlinedIcon,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "../api/mui";
import { DialogProps } from "@mui/material/Dialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { useEffect } from "react";
import { GetCustomer, CustomerModify } from "../api/Server/Customer";
import ScrollDialog from "./contract";
type Address = {
  address1: string;
  address2: string;
};
interface IFormInput {
  name: string;
  zipcode: string;
  address1: string;
  address2: string;
  address3: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [check, setCheck] = React.useState(false);
  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const kiyaku = (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Link href="#" onClick={handleClickOpen("paper")}>
            利用規約
          </Link>
          に同意する
        </Grid>
      </Grid>
    </>
  );
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // TODO remove, this demo shouldn't need to reset the theme.
  const ZipCodeCheck = (zipcode: string) => {
    // 正規表現で郵便番号のフォーマットにマッチするか判定
    if (zipcode == "") {
      if (ZipCode == "") setZipCodeError("この欄は必須です。");
      return false;
    } else {
      const isValidFormat = /^\d{3}-?\d{4}$/.test(zipcode);

      if (!isValidFormat) {
        setZipCodeError("郵便番号の形式が違います。");
        return false;
      } else {
        setZipCodeError("");
      }
      // ハイフンを削除して返す
      return zipcode.replace("-", "");
    }
  };
  const NameCheck = (Name: string) => {
    if (Name != "") {
      setNameError("");
      return true;
    } else {
      setNameError("この欄は必須です。");
      return false;
    }
  };
  const Address1Check = (Address1: string) => {
    if (Address1 != "") {
      setAddress1Error("");
      return true;
    } else {
      setAddress1Error("この欄は必須です。");
      return false;
    }
  };
  const Address2Check = (Address2: string) => {
    if (Address2 != "") {
      setAddress2Error("");
      return true;
    } else {
      setAddress2Error("この欄は必須です。");
      return false;
    }
  };
  const CheckCheck = (Check: boolean) => {
    if (Check) {
      setCheckError("");
      return true;
    } else {
      setCheckError("利用規約に同意してください。");
      return false;
    }
  };
  const PhoneNumberCheck = (PhoneNumber: string) => {
    // 正規表現で郵便番号のフォーマットにマッチするか判定
    const isValidFormat = /^0\d{1,4}-\d{1,4}-\d{4}$/.test(PhoneNumber);
    if (PhoneNumber == "") {
      setPhoneNumberError("この欄は必須です。");
      return false;
    } else {
      if (!isValidFormat) {
        setPhoneNumberError("電話番号の形式が違います。");
        return false;
      } else {
        setPhoneNumberError("");
        return true;
      }
    }
  };
  async function GetAddressFromZipCode(ZipCode: string) {
    const zipcode = ZipCodeCheck(ZipCode);
    if (zipcode) {
      GetAddress(zipcode)
        .then((addressData) => {
          if (addressData) {
            const Address = addressData[0];
            setAddress1(Address.address1 + Address.address2);
            setAddress2(Address.address3);
          }
        })
        .catch((error) => {
          console.error(error);
          return;
        });
    } else {
      return;
    }
  }
  fbinitialize();
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const [Name, setName] = useState<string>("");
  const [Address1, setAddress1] = useState<string>("");
  const [Address2, setAddress2] = useState<string>("");
  const [Address3, setAddress3] = useState<string>("");
  const [ZipCode, setZipCode] = useState<string>("");
  const [PhoneNumber, setPhoneNumber] = useState<string>("");

  const [NameError, setNameError] = useState<string | null>("");
  const [Address1Error, setAddress1Error] = useState<string | null>("");
  const [Address2Error, setAddress2Error] = useState<string | null>("");
  const [ZipCodeError, setZipCodeError] = useState<string | null>("");
  const [PhoneNumberError, setPhoneNumberError] = useState<string | null>("");
  const [CheckError, setCheckError] = useState<string | null>("");
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (
        NameCheck(Name) &&
        Address1Check(Address1) &&
        Address2Check(Address2) &&
        ZipCodeCheck(ZipCode) &&
        PhoneNumberCheck(PhoneNumber) &&
        CheckCheck(check)
      ) {
        console.log(data);
        const MyData = {
          Name: Name,
          ZipCode: ZipCode,
          Address1: Address1,
          Address2: Address2,
          Address3: Address3,
          PhoneNumber: PhoneNumber,
        };
        console.log("Customer", MyData);
        const res = await Register(MyData);
        console.log(res);
        router.push("/mypage/shipping_info");
      } else {
        console.log("エラーが発生しました");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        配送先情報の登録
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={NameError ? true : false}
              autoFocus
              required
              fullWidth
              label="氏名"
              variant="standard"
              autoComplete="name"
              value={Name}
              helperText={NameError}
              onChange={(e) => {
                NameCheck(e.target.value);
                setName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={3}>
              <TextField
                error={ZipCodeError ? true : false}
                required
                fullWidth
                label="郵便番号"
                variant="standard"
                autoComplete="zipcode"
                placeholder="000-0000"
                value={ZipCode}
                helperText={ZipCodeError}
                onChange={(e) => {
                  ZipCodeCheck(e.target.value);
                  setZipCode(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={async () => {
                  GetAddressFromZipCode(ZipCode);
                }}
              >
                住所検索
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Address1Error ? true : false}
              fullWidth
              variant="standard"
              autoComplete="address"
              value={Address1}
              helperText={Address1Error}
              label="都道府県・市区町村"
              onChange={(e) => {
                Address1Check(e.target.value);
                setAddress1(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Address2Error ? true : false}
              fullWidth
              variant="standard"
              autoComplete="address"
              value={Address2}
              label="番地等"
              helperText={Address2Error}
              onChange={(e) => {
                Address2Check(e.target.value);
                setAddress2(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <>
              <TextField
                fullWidth
                label="マンション等"
                variant="standard"
                autoComplete="address"
                value={Address3}
                onChange={(e) => setAddress3(e.target.value)}
              />
            </>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={PhoneNumberError ? true : false}
              required
              fullWidth
              label="電話番号"
              variant="standard"
              placeholder="000-0000-0000"
              autoComplete="phoneNumber"
              value={PhoneNumber}
              helperText={PhoneNumberError}
              onChange={(e) => {
                PhoneNumberCheck(e.target.value);
                setPhoneNumber(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <React.Fragment>
              <FormGroup>
                <FormControl error={CheckError ? true : false}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={check}
                        required
                        onChange={(e) => setCheck(e.target.checked)}
                      />
                    }
                    label={kiyaku}
                  />
                  <FormHelperText>{CheckError}</FormHelperText>
                </FormControl>
              </FormGroup>

              <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">利用規約</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                    <Typography variant="h6">利用規約</Typography>
                    <Typography variant="body2">
                      この利用規約（以下、「本規約」といいます）は、ショッピングサイト（以下、「当サイト」といいます）の利用に関する条件を定めるものです。以下の利用規約をよくお読みいただき、ご同意の上で当サイトをご利用ください。
                    </Typography>
                    <Typography variant="h6">1. 個人情報の利用</Typography>
                    <Typography variant="body2">
                      当サイトでは、お客様の氏名、住所、電話番号などの個人情報を、商品の配送やお問い合わせ対応の目的で利用いたします。お客様の個人情報は、当サイトのプライバシーポリシーに従って適切に管理されます。
                    </Typography>
                    <Typography variant="h6">2. アカウントの削除</Typography>
                    <Typography variant="body2">
                      お客様がアカウントを削除した場合、アカウントに関連する情報は削除されますが、取引履歴などのデータは削除されません。これは、法的な義務や財務記録の目的で保持される場合があるためです。
                    </Typography>
                    <Typography variant="h6">
                      3. 返品に関する取り決め
                    </Typography>
                    <Typography variant="body2">
                      商品の返品については、メールによるやり取りをもって対応いたします。返品に関する詳細な手続きや条件は、当サイトの返品ポリシーに明示されておりますので、返品をご希望の場合には、以下の返品に関するポリシーをご確認ください。
                    </Typography>
                    <Typography variant="h6">4. 知的財産権</Typography>
                    <Typography variant="body2">
                      当サイト上のコンテンツ（文章、画像、ロゴなど）は、当サイトまたはコンテンツ提供者によって所有されています。お客様は、当サイトを正当な目的で利用する範囲内でのみ、これらのコンテンツを使用することができます。
                    </Typography>
                    <Typography variant="h6">
                      5. スクレイピングの禁止
                    </Typography>
                    <Typography variant="body2">
                      当サイトのコンテンツやデータの無断スクレイピングは禁止されています。当サイトの承諾なしに、自動化ツールやソフトウェアを使用して情報を収集することは禁止されています。
                    </Typography>
                    <Typography variant="h6">6. セキュリティ対策</Typography>
                    <Typography variant="body2">
                      当サイトは、お客様の個人情報の保護とセキュリティ対策に最善の努力を払っています。しかしながら、インターネット上の情報の送受信は常にリスクが伴うものであり、完全なセキュリティを保証するものではありません。お客様自身の責任において、個人情報の保護にご協力ください。
                    </Typography>
                    <Typography variant="h6">7. 免責事項</Typography>
                    <Typography variant="body2">
                      当サイトは、商品の品質、適合性、および配送に関する一切の責任を負いません。また、当サイトの利用によって生じたいかなる損害についても責任を負いません。お客様自身の責任において、商品の選択、取引の判断を行ってください。
                    </Typography>
                    <Typography variant="h6">8. 利用規約の変更</Typography>
                    <Typography variant="body2">
                      当サイトは、利用規約を必要に応じて変更する権利を有します。変更があった場合には、当サイト上での掲示またはお客様への通知によってお知らせいたします。変更後の利用規約は、変更が掲示された時点から効力を有するものとします。
                    </Typography>
                    <Typography variant="h6">返品に関するポリシー</Typography>

                    <Typography variant="body2" paragraph>
                      当サイトでは、お客様が商品の返品をご希望される場合には、以下のポリシーに基づいて対応いたします。商品の返品に関する詳細な手続きや条件について、以下に記載いたします。
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                      1. 返品対象商品
                    </Typography>
                    <Typography variant="body2" paragraph>
                      返品可能な商品は、以下の条件をすべて満たす必要があります:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body2">
                          未使用であり、未開封であること。
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          商品の状態が販売時と同様であること。
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          当サイトで購入された商品であること。
                        </Typography>
                      </li>
                    </ul>

                    <Typography variant="h6" gutterBottom>
                      2. 返品期限
                    </Typography>
                    <Typography variant="body2" paragraph>
                      返品の受け付け期限は、商品到着後14日以内とします。14日を過ぎた場合、返品は受け付けられませんのでご了承ください。
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                      3. 返品手続き
                    </Typography>
                    <Typography variant="body2" paragraph>
                      以下の手続きに従って、返品手続きを行ってください:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body2">
                          当サイトにお問い合わせいただくか、メールにて返品の旨をお知らせください。
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          弊社からの指示に従って、返品商品の発送手続きを行ってください。
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          返品商品が到着した際に、内容物を確認し、返品が受理されたことをお知らせいたします。
                        </Typography>
                      </li>
                    </ul>

                    <Typography variant="h6" gutterBottom>
                      4. 返品送料
                    </Typography>
                    <Typography variant="body2" paragraph>
                      お客様都合による返品の場合、返品送料はお客様のご負担となります。ただし、商品の不良や誤配送など当サイトの責任による返品の場合、返品送料は当サイトが負担いたします。
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                      5. 返金処理
                    </Typography>
                    <Typography variant="body2" paragraph>
                      返品が受理された場合、以下の方法により返金処理を行います:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body2">
                          クレジットカードでの決済の場合、返金額は元のクレジットカード口座に返金されます。
                        </Typography>
                      </li>
                    </ul>

                    <Typography variant="h6" gutterBottom>
                      6. 返品不可商品
                    </Typography>
                    <Typography variant="body2" paragraph>
                      以下の商品については、返品を受け付けることができません:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body2">
                          個別注文や特別オーダーにより製作された商品。
                        </Typography>
                      </li>
                    </ul>

                    <Typography variant="body2" paragraph>
                      なお、上記のポリシーは一般的な返品条件を示したものであり、特定の商品や状況によっては異なる条件が適用される場合があります。商品の詳細ページや注文時の確認画面にて、返品に関する特別な条件が明示されている場合は、その条件が優先されます。
                    </Typography>

                    <Typography variant="body2" paragraph>
                      ご返品に関するお問い合わせや詳細な手続きについては、当サイトのカスタマーサポートにお問い合わせいただくか、返品ポリシーのページをご参照ください。
                    </Typography>

                    <Typography variant="body2" paragraph>
                      以上が、当サイトの返品ポリシーです。ご購入される際には、返品ポリシーをご確認いただき、お客様自身の責任において商品を選択していただけますようお願いいたします。
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>閉じる</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          登録する
        </Button>
      </Box>
    </Box>
  );
};
export default SignUpForm;
