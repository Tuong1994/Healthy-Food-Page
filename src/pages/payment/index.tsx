import { NextPage } from "next";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import PaymentMethods from "@/features/payment/PaymentMethods";
import PaymentTransfer from "@/features/payment/PaymentTransfer";
import PaymentCash from "@/features/payment/PaymentCash";
import PaymentCod from "@/features/payment/PaymentCod";

const { Typography } = UI;

const { Title } = Typography;

const Payment: NextPage = () => {
  const { lang } = useLang();

  return (
    <div className="page payment">
      <Title weight={600}>{lang.payment.title}</Title>
      <PaymentMethods lang={lang} />
      <PaymentTransfer lang={lang} />
      <PaymentCash lang={lang} />
      <PaymentCod lang={lang} />
    </div>
  );
};

export default Payment;
