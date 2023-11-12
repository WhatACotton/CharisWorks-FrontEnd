import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
} from "../api/mui";
import { useEffect } from "react";
import { GetCustomer, CustomerModify } from "../api/Server/Customer";
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

const ModifyForm = () => {
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
  async function fetchData() {
    const response = await GetCustomer();
    console.log(response);
    if (response) {
      const Customer = response.Customer;
      setName(Customer.Name);
      setAddress1(Customer.Address1);
      setAddress2(Customer.Address2);
      setAddress3(
        Customer.Address3 == undefined
          ? ""
          : Customer.Address3.replace(/&#(\d+);/g, (match, p1) =>
              String.fromCharCode(parseInt(p1, 10))
            )
      );
      setZipCode(Customer.ZipCode);
      setPhoneNumber(Customer.PhoneNumber);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (
        NameCheck(Name) &&
        Address1Check(Address1) &&
        Address2Check(Address2) &&
        ZipCodeCheck(ZipCode) &&
        PhoneNumberCheck(PhoneNumber)
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
        const res = await CustomerModify(MyData);
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
        配送先情報の修正
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
export default ModifyForm;
