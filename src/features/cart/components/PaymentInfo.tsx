import { FC } from "react";
import { Card, InfoRow, Divider, Typography } from "@/components/UI";
import { ELang } from "@/common/enum";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import utils from "@/utils";

const { Paragraph } = Typography;

interface PaymentInfoProps {
  locale: ELang;
  lang: Lang;
  totalPrice: number;
  totalQuantity: number;
  shipmentFee: number;
  paymentBeforeTax: number;
  taxFee: number;
  totalPayment: number;
  hasHead?: boolean;
}

const PaymentInfo: FC<PaymentInfoProps> = ({
  locale,
  totalPrice,
  totalQuantity,
  shipmentFee,
  paymentBeforeTax,
  taxFee,
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
      rootClassName="card-container"
      head={
        hasHead ? (
          <Paragraph weight={600} size={16}>
            {lang.cart.info.title}
          </Paragraph>
        ) : undefined
      }
    >
      <InfoRow label={lang.cart.info.product} text={String(totalQuantity)} {...commonProps} />
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
      <InfoRow
        label={lang.cart.info.totalPricePreTax}
        text={utils.formatPrice(locale, paymentBeforeTax)}
        {...commonProps}
      />
      <InfoRow label={lang.cart.info.tax} text={utils.formatPrice(locale, taxFee)} {...commonProps} />
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
