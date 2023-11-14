import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteUser } from "firebase/auth";
import { FireBaseDeleteUser } from "../../api/FireBase/reqForFirebase";
import { useRouter } from "next/router";
import fbinitialize from "../../api/FireBase/firebaseConfig";
import { LogOut } from "../../api/Server/Customer";
export default function AlertDialog() {
  fbinitialize();
  const [open, setOpen] = React.useState(true);
  const [agree, setAgree] = React.useState(false);
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="アカウントの削除"
        aria-describedby="アカウントを削除しますか？"
      >
        <DialogTitle id="alert-dialog-title">
          {"アカウントを削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            アカウントを削除します。削除後は取引履歴などを確認することはできません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              await FireBaseDeleteUser();
              handleClose();
              router.push("/mypage/logout");
            }}
          >
            はい
          </Button>

          <Button
            onClick={() => {
              handleClose();
              router.push("/mypage");
            }}
            autoFocus
          >
            いいえ
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
