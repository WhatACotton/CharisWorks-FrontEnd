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
                      この利用規約（以下、「本規約」といいます）は、当事業者が提供するサービス（以下、「本サービス」といいます）の利用条件を定めるものです。本サービスご利用されるお客様（以下、「お客様」といいます）は、本規約の内容に従って、本サービスを利用頂くものとします。
                      <br />
                      第１条（適用）
                      <br />
                      本規約は、当事業者及びすべてのお客様間の本サービスの利用に関わる一切の関係に適用されるものとします。また、当事業者がウェブサイトに掲載の上、提供する内容は本規約の一部として構成されます。
                      <br />
                      第２条（本規約への同意）
                      <br />
                      お客様は、本規約の内容を理解し、これに同意の上、本サービスを利用するものとします。なお、本サービスを利用した場合、お客様は、本規約の内容を理解し、これに同意の上、本サービスを利用したとみなすものとします。
                      <br />
                      第３条（登録）
                      <br />
                      １．本サービスの利用を希望する者（以下、「登録希望者」といいます）は、本規約の全条項を遵守することに同意し、かつ当社の定める一定の情報（以下、「登録情報」といいます）を当社の定める方法により当社に提供することにより、本サービスの利用の登録を申請することができます。
                      <br />
                      ２．登録の申請は、必ず本サービスを利用する本人が行わなければならず、当社が事前に承諾した場合を除き、代理人による登録申請は認められません。また、登録希望者は、登録の申請にあたり、真実、正確かつ最新の情報を当社に提供しなければなりません。
                      <br />
                      第４条（外部サービスとの連携）
                      <br />
                      １．お客様は、外部サービスとの連携機能を利用してログインする際に、当事業者がデータにアクセスすることについての許可を求められることがあり、かかる内容を確認の上、許可した場合に限り、当該連携機能を利用することができるものとします。
                      <br />
                      ２．外部サービスのお客様IDの登録・利用を含むすべての外部サービスの利用については、お客様は、外部サービスの運営者が規定する各規約の定めに従うものとします。
                      <br />
                      ３．外部サービスを利用する場合、お客様は、自己の責任において当該サービスを利用するものとし、当事業者は、当該サービスを利用したことにより生じた損害、当該サービスの運営者・お客様等との間に生じたトラブルその他の当該サービスに関連する一切の事項について何らの責任も負わないものとします。
                      <br />
                      第５条（支払方法と支払時期）
                      <br />
                      １．お客様がサービスの利用を希望する場合、当事業者の定める方法により、予め定められた商品代金をお支払い頂くものとします。
                      <br />
                      ２．代金の支払い方法は、別途当事業者サービスにおいて利用可能なものを指定します。
                      <br />
                      ３．クレジットカードを使用する際には、お客様は必ず本人名義のクレジットカードを使用するものとします。
                      <br />
                      ４．クレジットカード等の決済手段の利用については、お客様と当該カード会社等との契約条件や利用規約に従うものとします。
                      <br />
                      第６条（知的財産権）
                      <br />
                      本サービスに関する一切の情報についての著作権及びその他の知的財産権はすべて当事業者又は当事業者にその利用を許諾した権利者に帰属します。お客様は、複製、譲渡、貸与、翻訳、改変、転載、公衆への送信（公衆への送信を可能とすることを含みます）、転送、配布、出版、営業のための使用等をしてはならないものとします。
                      <br />
                      第７条（禁止事項）
                      <br />
                      お客様は、本サービスの利用にあたり、以下の行為を行わないものとします。
                      <br />
                      （１）本サービスの円滑な提供を妨げる行為又は妨げる恐れのある行為
                      <br />
                      （２）法令若しくは公序良俗に違反する行為又は違反する恐れのある行為
                      <br />
                      （３）犯罪行為に関連する行為
                      <br />
                      （４）本サービスによって得られた情報を商業的に利用する行為
                      <br />
                      （５）当事業者のサービスの運営を妨害する恐れのある行為
                      <br />
                      （６）不正な目的をもって本サービスを利用する行為
                      <br />
                      （７）当事業者又は第三者の名誉・信用を毀損する行為又は毀損する恐れのある行為
                      <br />
                      （８）当事業者又は第三者を誹謗、中傷する行為又は誹謗、中傷、攻撃、脅迫、扇動、罵倒する恐れのある行為
                      <br />
                      （９）その他、当事業者が不適切と判断する行為
                      <br />
                      第８条（本サービスの提供の停止等）
                      <br />
                      １．当事業者は、以下のいずれかの事由があると判断した場合、お客様に事前に通知することなく、本サービスの全部または一部の提供を停止又は中断することがあります。
                      <br />
                      （１）本サービスに係るコンピュータシステムの保守点検又は更新を行う場合
                      <br />
                      （２）コンピューター又は通信回線等が事故により停止した場合
                      <br />
                      （３）地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの提供が困難となった場合
                      <br />
                      （４）その他、当事業者が本サービスの提供が困難と判断した場合
                      <br />
                      ２．当事業者は、本サービスの提供の停止又は中断により、お客様又は第三者が被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。
                      <br />
                      第９条（利用制限および登録抹消）
                      <br />
                      １．当事業者は、以下の場合には、事前の通知なく、当該お客様に対して、本サービスの全部もしくは一部の利用を制限し、またはお客様としての登録を抹消することができるものとします。
                      <br />
                      （１）本規約のいずれかの条項、又は関連法令に違反した場合
                      <br />
                      （２）登録事項に虚偽の事実があることが判明した場合
                      <br />
                      （３）その他、当事業者が本サービスの利用を適当でないと判断した場合
                      <br />
                      ２．当事業者は、本条に基づき当事業者が行った行為によりお客様に生じた損害について、一切の責任を負いません。
                      <br />
                      第１０条（本規約の変更）
                      <br />
                      １．当事業者は以下の場合に、当事業者の裁量により、本規約を変更することができます。
                      <br />
                      （１）本規約の変更が、お客様の一般の利益に適合するとき
                      <br />
                      （２）本規約の変更が、契約した目的に反せず、かつ、変更の必要性、変更後の内容の相当性、変更の内容その他の変更に係る事情に照らして合理的なものであるとき
                      <br />
                      ２．当事業者は前項による本規約の変更にあたり、事前に利用規約を変更する旨及び変更後の利用規約の内容とその効力発生日を本サイト上にて掲示し、またはお客様に電子メールで通知するものとします。
                      <br />
                      ３．変更後の利用規約の効力発生日以降にお客様が本サービスを利用したときは、お客様は、利用規約の変更に同意したものとみなします。
                      <br />
                      第１１条（規約違反があった場合の取り扱い）
                      <br />
                      １．当事業者は、お客様が本サービスの不正利用など利用規約等の何らの条項に違反した場合、本サービスの使用差止め、損害賠償請求（合理的な弁護士費用を含む）等の措置を取ることができます。
                      <br />
                      ２．お客様による不正使用を含む利用規約等の違反に関連し、生起する第三者との法的請求や責任については、当事業者は一切責任を負わず、利用規約等に違反したお客様は、自己の責任においてこれを処理し、当事業者に一切の迷惑や損害を与えないことを保証します。
                      <br />
                      ３．お客様が利用規約等に違反した場合で当事業者が必要と判断したとき、当事業者が当該お客様に関して有する情報を、当該違反に関連する第三者に開示できるものとします。
                      <br />
                      ４．利用規約の違反等の報告が当事業者にあった場合、当事業者は、当該違反の是正について合理的な範囲での最善の措置を講ずるよう努め、当事業者の裁量で当事業者が行う対応を決定することができるものとします。
                      <br />
                      第１２条（保証の否認及び免責）
                      <br />
                      １．当事業者は、本サービスに事実上又は法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しておりません。
                      <br />
                      ２．当事業者は、本サービスに起因してお客様に生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当事業者とお客様との間の契約（本規約を含みます）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
                      <br />
                      ３．前項ただし書に定める場合であっても、当事業者は、当事業者の過失（重過失を除きます）による債務不履行または不法行為によりお客様に生じた損害のうち特別な事情から生じた損害（当事業者またはお客様が損害発生につき予見し、または予見しえた場合を含みます）について一切の責任を負いません。
                      <br />
                      ４．当事業者は、お客様が商品を使用された後に、商品が破損・汚損したとしても一切保証しませんので予めご了承ください。
                      <br />
                      第１３条（分離可能性）
                      <br />
                      本規約のいずれかの条項又はその一部が、消費者契約法その他の法令等により無効又は執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効又は執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。
                      <br />
                      第１４条（準拠法および管轄裁判所）
                      <br />
                      １．本規約の解釈に当たっては、日本法を準拠法とします。
                      <br />
                      ２．本サービスに関して紛争が生じた場合には、当事業者の所在地を管轄する裁判所を専属的合意管轄とします。
                      <br />
                      〇〇年〇〇月〇〇日制定 利用規約
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
