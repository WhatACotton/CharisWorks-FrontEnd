import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid, Link } from "@mui/material";
export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

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

  return (
    <React.Fragment>
      <FormGroup>
        <FormControlLabel required control={<Checkbox />} label={kiyaku} />
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
            【利用規約】
            この利用規約（以下、「本規約」といいます）は、ショッピングサイト（以下、「当サイト」といいます）の利用に関する条件を定めるものです。以下の利用規約をよくお読みいただき、ご同意の上で当サイトをご利用ください。
            1. 個人情報の利用
            当サイトでは、お客様の氏名、住所、電話番号などの個人情報を、商品の配送やお問い合わせ対応の目的で利用いたします。お客様の個人情報は、当サイトのプライバシーポリシーに従って適切に管理されます。
            2. アカウントの削除
            お客様がアカウントを削除した場合、アカウントに関連する情報は削除されますが、取引履歴などのデータは削除されません。これは、法的な義務や財務記録の目的で保持される場合があるためです。
            3. 返品に関する取り決め
            商品の返品については、メールによるやり取りをもって対応いたします。返品に関する詳細な手続きや条件は、当サイトの返品ポリシーに明示されておりますので、返品をご希望の場合には、該当のポリシーをご確認ください。
            4. 知的財産権
            当サイト上のコンテンツ（文章、画像、ロゴなど）は、当サイトまたはコンテンツ提供者によって所有されています。お客様は、当サイトを正当な目的で利用する範囲内でのみ、これらのコンテンツを使用することができます。
            5. スクレイピングの禁止
            当サイトのコンテンツやデータの無断スクレイピングは禁止されています。当サイトの承諾なしに、自動化ツールやソフトウェアを使用して情報を収集することは禁止されています。
            6. セキュリティ対策
            当サイトは、お客様の個人情報の保護とセキュリティ対策に最善の努力を払っています。しかしながら、インターネット上の情報の送受信は常にリスクが伴うものであり、完全なセキュリティを保証するものではありません。お客様自身の責任において、個人情報の保護にご協力ください。
            7. 免責事項
            当サイトは、商品の品質、適合性、および配送に関する一切の責任を負いません。また、当サイトの利用によって生じたいかなる損害についても責任を負いません。お客様自身の責任において、商品の選択、取引の判断を行ってください。
            8. 利用規約の変更
            当サイトは、利用規約を必要に応じて変更する権利を有します。変更があった場合には、当サイト上での掲示またはお客様への通知によってお知らせいたします。変更後の利用規約は、変更が掲示された時点から効力を有するものとします。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
