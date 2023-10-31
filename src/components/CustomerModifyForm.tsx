import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Register } from "../lib/Server/FireBase";
import { useRouter } from "next/router";
import fbinitialize from "../lib/FireBase/firebaseConfig";
import { GetAddress } from "../lib/Address";
import { useState } from "react";
import {
  Box,
  Avatar,
  LockOutlinedIcon,
  Typography,
  Grid,
  TextField,
  Button,
} from "../lib/mui";
import { useEffect } from "react";
import { CustomerGet, CustomerModify } from "../lib/Server/Customer";
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
  const normalizeZipcode = (zipcode: string) => {
    // 正規表現で郵便番号のフォーマットにマッチするか判定
    if (zipcode == "") {
      if (ZipCode == "") setZipCodeError("この欄は必須です。");
    } else {
      const isValidFormat = /^\d{3}-?\d{4}$/.test(zipcode);

      if (!isValidFormat) {
        setZipCodeError("郵便番号の形式が違います。");
        return;
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
    } else {
      setNameError("この欄は必須です。");
    }
  };
  const Address1Check = (Address1: string) => {
    if (Address1 != "") {
      setAddress1Error("");
    } else {
      setAddress1Error("この欄は必須です。");
    }
  };
  const Address2Check = (Address2: string) => {
    if (Address2 != "") {
      setAddress2Error("");
    } else {
      setAddress2Error("この欄は必須です。");
    }
  };

  const PhoneNumberCheck = (PhoneNumber: string) => {
    // 正規表現で郵便番号のフォーマットにマッチするか判定
    const isValidFormat = /^0\d{1,4}-\d{1,4}-\d{4}$/.test(PhoneNumber);
    if (PhoneNumber == "") {
      setPhoneNumberError("この欄は必須です。");
    } else {
      if (!isValidFormat) {
        setPhoneNumberError("電話番号の形式が違います。");
        return;
      } else {
        setPhoneNumberError("");
      }
    }
  };
  async function GetAddressFromZipCode(ZipCode: string) {
    const zipcode = normalizeZipcode(ZipCode);
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
    const response = await CustomerGet();
    console.log(response);
    if (response) {
      const Customer = response.Customer;
      setName(Customer.Name);
      setAddress1(Customer.Address1);
      setAddress2(Customer.Address2);
      setAddress3(Customer.Address3);
      setZipCode(Customer.ZipCode);
      setPhoneNumber(Customer.PhoneNumber);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log(data);
      console.log(ZipCode);
      console.log(Address1);
      console.log(Address2);
      console.log(Address3);
      console.log(PhoneNumber);

      await normalizeZipcode(ZipCode);
      await NameCheck(Name);
      await Address1Check(Address1);
      await Address2Check(Address2);
      await PhoneNumberCheck(PhoneNumber);
      console.log(PhoneNumberError);
      console.log(NameError);
      console.log(Address1Error);

      console.log(Address2Error);
      console.log(ZipCodeError);
      if (
        ZipCodeError == "" &&
        Address1Error == "" &&
        Address2Error == "" &&
        PhoneNumberError == "" &&
        NameError == ""
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
        console.log(MyData);
        const res = await CustomerModify(MyData);
        console.log(res);
        router.push("/mypage");
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
        新規登録
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {!NameError ? (
              <>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  label="氏名"
                  variant="standard"
                  autoComplete="name"
                  value={Name}
                  {...register("name")}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            ) : (
              <>
                <TextField
                  error
                  required
                  fullWidth
                  label="氏名"
                  variant="standard"
                  autoComplete="name"
                  value={Name}
                  helperText={NameError}
                  {...register("name")}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={3}>
              {!ZipCodeError ? (
                <>
                  <TextField
                    required
                    fullWidth
                    label="郵便番号"
                    variant="standard"
                    autoComplete="zipcode"
                    placeholder="000-0000"
                    value={ZipCode}
                    {...register("zipcode")}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <TextField
                    error
                    required
                    fullWidth
                    label="郵便番号"
                    variant="standard"
                    autoComplete="zipcode"
                    placeholder="000-0000"
                    value={ZipCode}
                    helperText={ZipCodeError}
                    {...register("zipcode")}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </>
              )}
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
            {!Address1Error ? (
              <>
                <TextField
                  fullWidth
                  variant="standard"
                  autoComplete="address"
                  value={Address1}
                  label="都道府県・市区町村"
                  {...register("address1")}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </>
            ) : (
              <>
                <TextField
                  error
                  fullWidth
                  variant="standard"
                  autoComplete="address"
                  value={Address1}
                  label="都道府県・市区町村"
                  helperText={Address1Error}
                  {...register("address1")}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {!Address2Error ? (
              <>
                <TextField
                  fullWidth
                  variant="standard"
                  autoComplete="address"
                  value={Address2}
                  label="番地等"
                  {...register("address2")}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </>
            ) : (
              <>
                <TextField
                  error
                  fullWidth
                  variant="standard"
                  autoComplete="address"
                  label="番地等"
                  value={Address2}
                  helperText={Address2Error}
                  {...register("address2")}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <>
              <TextField
                fullWidth
                label="マンション等"
                variant="standard"
                autoComplete="address"
                value={Address3}
                {...register("address3")}
                onChange={(e) => setAddress3(e.target.value)}
              />
            </>
          </Grid>
          <Grid item xs={12}>
            {!PhoneNumberError ? (
              <>
                <TextField
                  required
                  fullWidth
                  label="電話番号"
                  variant="standard"
                  placeholder="000-0000-0000"
                  autoComplete="phoneNumber"
                  value={PhoneNumber}
                  {...register("phoneNumber")}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </>
            ) : (
              <>
                <TextField
                  error
                  required
                  fullWidth
                  label="電話番号"
                  variant="standard"
                  placeholder="000-0000-0000"
                  autoComplete="phoneNumber"
                  helperText={PhoneNumberError}
                  value={PhoneNumber}
                  {...register("phoneNumber")}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                />
              </>
            )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          新規登録
        </Button>
      </Box>
    </Box>
  );
};
export default ModifyForm;
