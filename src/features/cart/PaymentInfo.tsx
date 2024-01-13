import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";

const { Card, InfoRow, Divider, Typography } = UI;

const { Paragraph } = Typography;

interface PaymentInfoProps {
  lang: Lang;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ lang }) => {
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
      <InfoRow label={lang.cart.info.totalPrice} text="$5,000,000" {...commonProps} />
      <InfoRow label={lang.cart.info.deliveryFee} text="$0" {...commonProps} />
      <InfoRow label={lang.cart.info.tax} text="10%" {...commonProps} />
      <Divider />
      <InfoRow
        {...commonProps}
        label={lang.cart.info.totalPayment}
        text="$5,500,000"
        textProps={{ size: 18, variant: "success", weight: 600 }}
      />
    </Card>
  );
};

export default PaymentInfo;
