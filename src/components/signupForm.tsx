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
interface IFormInput {
  name: string;
  zipcode: string;
  address: string;
  email: string;
  password: string;
}
// TODO remove, this demo shouldn't need to reset the theme.
const normalizeZipcode = (zipcode: string) => {
  // 正規表現で郵便番号のフォーマットにマッチするか判定
  const isValidFormat = /^\d{3}-?\d{4}$/.test(zipcode);

  if (!isValidFormat) {
    return;
  }

  // ハイフンを削除して返す
  return zipcode.replace("-", "");
};

const SignUpForm = () => {
  fbinitialize();
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    const MyData = {
      Name: data.name,
      ZipCode: data.zipcode,
      Address: data.address,
    };
    console.log(MyData);
    Register(MyData)
      .then((res) => {
        console.log(res);
        router.push("/mypage");
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };
  const [Address, setAddress] = useState<string>("");
  const [ZipCode, setZipCode] = useState<string>("");
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
            <TextField
              required
              fullWidth
              label="氏名"
              variant="standard"
              autoComplete="name"
              {...register("name")}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                label="郵便番号"
                variant="standard"
                autoComplete="zipcode"
                placeholder="000-0000"
                {...register("zipcode")}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={async () => {
                  const zipcode = normalizeZipcode(ZipCode);
                  if (zipcode) {
                    GetAddress(zipcode)
                      .then((addressData) => {
                        if (addressData) {
                          for (const address of addressData) {
                            console.log(
                              `住所: ${address.address1}${address.address2}${address.address3}`
                            );
                            setAddress(
                              `${address.address1}${address.address2}${address.address3}`
                            );
                          }
                          console.log(addressData);
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
                }}
              >
                住所検索
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              variant="standard"
              autoComplete="address"
              value={Address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="番地・マンション等"
              variant="standard"
              autoComplete="address"
              {...register("address")}
            />
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
export default SignUpForm;
