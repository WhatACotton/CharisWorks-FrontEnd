import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../api/theme";
import { CartCountProvider } from "../api/Contexts/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import React from "react";
const Privacy_Policy = () => {
  return (
    <CartCountProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom align="center">
            プライバシーポリシー
          </Typography>
          <Typography variant="body1" gutterBottom>
            当社のECサイトをご利用いただき、ありがとうございます。当社は、お客様のプライバシーと個人情報の保護を非常に重要視しており、以下に示すプライバシーポリシーを厳守いたします。
          </Typography>
          <Typography variant="h4" component="h3" gutterBottom>
            1. 収集する情報
          </Typography>
          <Typography variant="body1" gutterBottom>
            当社は、お客様が商品を購入するために必要な最低限の情報を収集します。これには、お名前、連絡先情報（電話番号、メールアドレスなど）、配送先情報などが含まれます。また、当社のサイトを通じて行われるすべての通信や取引の記録も保持されます。
          </Typography>
          <Typography variant="h4" component="h3" gutterBottom>
            2. 情報の使用
          </Typography>
          <Typography variant="body1" gutterBottom>
            お客様から収集した情報は、以下の目的のために使用されます。 -
            注文の処理と配送:
            受注確認、商品の発送、お客様への連絡など、注文に関連する業務の遂行に使用されます。
            - カスタマーサポート:
            お問い合わせやサポート要求に対応するため、または商品やサービスに関する重要な情報を提供するために使用されます。
            - サイトの改善:
            当社のサイトやサービスの改善に役立つ統計データの収集や分析に使用されます。
          </Typography>
          <Typography variant="h4" component="h3" gutterBottom>
            3. 情報の保護
          </Typography>
          <Typography variant="body1" gutterBottom>
            当社は、お客様の個人情報を適切に保護するための安全対策を実施しています。当社は、不正アクセス、情報の紛失、改ざん、漏洩などのリスクに対して、技術的、組織的な対策を講じます。また、お客様の個人情報へのアクセスを制限し、関係者には情報保護に関する厳しい規定を適用しています。
          </Typography>
          <Typography variant="h4" component="h3" gutterBottom>
            4. 第三者への提供
          </Typography>
          <Typography variant="body1" gutterBottom>
            当社はお客様の個人情報を第三者と共有することはありません。ただし、以下の場合に限り、お客様の同意を得た上で情報を提供することがあります。
            - 配送業者:
            商品の発送に必要な情報を配送業者に提供する場合があります。 -
            法的要件:
            当社が適用される法的要件に従って、お客様の情報を提供する場合があります。
          </Typography>
          <Typography variant="h4" component="h3" gutterBottom>
            5. Cookieの使用
          </Typography>
          <Typography variant="body1" gutterBottom>
            当社のサイトは、Cookieを使用してお客様のウェブブラウザに一意の識別子を保存する場合があります。これにより、お客様がサイトを再訪問した際に、よりパーソナライズされた体験を提供できます。Cookieは個人情報を収集するためのものではなく、ブラウザの設定から削除することも可能です。
          </Typography>
          <Typography variant="h4" component="h3" gutterBottom>
            6. 未成年者のプライバシー保護
          </Typography>
          <Typography variant="body1" gutterBottom>
            当社のサービスは、未成年者にも提供されていますが、未成年者の個人情報を意図的に収集することはありません。未成年者が当社のサービスを利用する場合は、保護者の同意を得ることをお勧めします。
          </Typography>
          <Typography variant="h4" component="h3" gutterBottom>
            7. プライバシーポリシーの変更
          </Typography>
          <Typography variant="body1" gutterBottom>
            当社は、プライバシーポリシーを変更する場合があります。重要な変更がある場合は、当社のウェブサイト上で通知を行います。プライバシーポリシーの変更があった場合には、変更が適用される前にお客様からの同意を得ることもあります。
            最後に、当社はお客様の個人情報を適切に保護し、慎重に取り扱います。お客様のプライバシーに対する信頼を築くために、当社は最善の努力を尽くします。
            もし、プライバシーポリシーに関する質問や懸念がある場合は、お気軽にお問い合わせください。ご協力とご理解に感謝いたします。
          </Typography>
        </Container>
        <Footer />
      </ThemeProvider>
    </CartCountProvider>
  );
};
export default Privacy_Policy;
