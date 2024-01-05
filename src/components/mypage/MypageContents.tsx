import React, { ReactElement, useEffect, useState } from "react";
import { Grid, Link, ListItemButton, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
const BuyerCard = [
  {
    title: "登録情報の確認・修正",
    link: "/mypage/shipping_info",
    description: "住所などの配送に関する情報を確認・修正ができます。",
    icon: <PermIdentityOutlinedIcon fontSize="large" />,
  },
  {
    title: "取引履歴の確認",
    link: "/mypage/transaction",
    description: "現在発送中の取引や、過去の取引履歴を確認できます。",
    icon: <ReceiptLongOutlinedIcon fontSize="large" />,
  },
  {
    title: "ログアウト",
    link: "/mypage/logout",
    description: "ログアウトします。",
    icon: <LogoutIcon fontSize="large" />,
  },
  {
    title: "その他の設定",
    link: "/mypage/setting",
    description: "その他の設定を確認・変更できます。",
    icon: <SettingsIcon fontSize="large" />,
  },
];
const SellerCard = [
  {
    title: "登録情報の確認・修正",
    link: "/mypage/shipping_info",
    description: "住所などの配送に関する情報を確認・修正ができます。",
    icon: <PermIdentityOutlinedIcon fontSize="large" />,
  },
  {
    title: "取引履歴の確認",
    link: "/mypage/transaction",
    description: "現在発送中の取引や、過去の取引履歴を確認できます。",
    icon: <ReceiptLongOutlinedIcon fontSize="large" />,
  },
  {
    title: "ログアウト",
    link: "/mypage/logout",
    description: "ログアウトします。",
    icon: <LogoutIcon fontSize="large" />,
  },
  {
    title: "その他の設定",
    link: "/mypage/setting",
    description: "その他の設定を確認・変更できます。",
    icon: <SettingsIcon fontSize="large" />,
  },
  {
    title: "販売者用ページ",
    link: "/maker",
    description: "販売者の方向けのページです。",
    icon: <SettingsIcon fontSize="large" />,
  },
];
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
type CardContent = {
  title: string;
  link: string;
  description: string;
  icon: ReactElement;
};
interface CardContents {
  CardContents: CardContent[];
}
interface Props {
  Role: string | null | undefined;
}
const CardMapping = (CardContents: CardContents) => {
  return (
    <>
      <Grid container spacing={3} sx={{ m: 3, p: 3, pr: 10 }}>
        {CardContents.CardContents.map((card, index) => (
          <Grid item key={index} xs={12} sm={12} md={6}>
            <Link href={card.link}>
              <Card>
                <CardContent>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item xs={8} sm={8} md={8}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                      {card.icon}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
const MypageContents = (Props: Props) => {
  const Role = Props.Role;
  if (typeof Role == "string") {
    if (Role == "Seller" || Role == "Admin"||Role =="preSeller") {
      return <CardMapping CardContents={SellerCard} />;
    } else {
      return <CardMapping CardContents={BuyerCard} />;
    }
  }
};
export default MypageContents;
