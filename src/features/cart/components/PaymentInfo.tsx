import { FC } from "react";
import { Card, InfoRow, Divider, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import { ELang } from "@/common/enum";
import utils from "@/utils";

const { Paragraph } = Typography;

interface PaymentInfoProps {
  locale: ELang;
  lang: Lang;
  totalPrice: number;
  totalQuatity: number;
  shipmentFee: number;
  totalPayment: number;
  hasHead?: boolean;
}

const PaymentInfo: FC<PaymentInfoProps> = ({
  locale,
  totalPrice,
  totalQuatity,
  shipmentFee,
  totalPayment,
  hasHead = true,
  lang,
}) => {
  const commonProps: InfoRowProps = {
    labelSpanProps: { span: 10 },
    textSpanProps: { span: 14 },
  };

  return (
    <Card
      head={
        hasHead ? (
          <Paragraph weight={600} size={16}>
            {lang.cart.info.title}
          </Paragraph>
        ) : undefined
      }
    >
      <InfoRow label={lang.cart.info.product} text={String(totalQuatity)} {...commonProps} />
      <InfoRow
        label={lang.cart.info.totalPrice}
        text={utils.formatPrice(locale, totalPrice)}
        {...commonProps}
      />
      <InfoRow
        label={lang.cart.info.deliveryFee}
        text={utils.formatPrice(locale, shipmentFee)}
        {...commonProps}
      />
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
