import { FC } from "react";
import { Card, InfoRow, Divider, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import { ELang } from "@/common/enum";
import useSumQuantity from "../hooks/useSumQuanity";
import useSumPrice from "../hooks/useSumPrice";
import utils from "@/utils";

const { Paragraph } = Typography;

interface PaymentInfoProps {
  locale: ELang;
  lang: Lang;
}

const PaymentInfo: FC<PaymentInfoProps> = ({ locale, lang }) => {
  const totalQuatity = useSumQuantity("cart");

  const totalPrice = useSumPrice("cart");

  const totalPayment = totalPrice + (totalPrice * 10) / 100;

  const commonProps: InfoRowProps = {
    labelSpanProps: { span: 10 },
    textSpanProps: { span: 14 },
  };

  return (
    <Card
      head={
        <Paragraph weight={600} size={16}>
          {lang.cart.info.title}
        </Paragraph>
      }
    >
      <InfoRow label={lang.cart.info.product} text={String(totalQuatity)} {...commonProps} />
      <InfoRow
        label={lang.cart.info.totalPrice}
        text={utils.formatPrice(locale, totalPrice)}
        {...commonProps}
      />
      <InfoRow label={lang.cart.info.deliveryFee} text={utils.formatPrice(locale, 0)} {...commonProps} />
      <InfoRow label={lang.cart.info.tax} text="10%" {...commonProps} />
      <Divider />
      <InfoRow
        {...commonProps}
        label={lang.cart.info.totalPayment}
        textProps={{ size: 18, variant: "success", weight: 600 }}
        text={utils.formatPrice(locale, totalPayment)}
      />
    </Card>
  );
};

export default PaymentInfo;
