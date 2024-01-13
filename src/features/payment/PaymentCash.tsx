import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";

const { Divider, InfoRow, Grid, Typography } = UI;

const { Paragraph } = Typography;

interface PaymentCashProps {
  lang: Lang;
}

const PaymentCash: React.FC<PaymentCashProps> = ({ lang }) => {
  return (
    <div className="payment-cash">
      <Paragraph size={22} weight={600} variant="success">
        {lang.payment.cash.title}
      </Paragraph>
      <Divider />
      <Paragraph size={16} rootClassName="cash-content">
        {lang.payment.cash.content}
      </Paragraph>
      <InfoRow
        rootClassName="cash-address"
        label={lang.common.form.label.address}
        text={lang.pageComponent.footer.address}
        labelSpanProps={{ xs: 6, md: 3, span: 2 }}
        textSpanProps={{ xs: 18, md: 18, span: 14 }}
      />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2245127424803!2d106.67648707377518!3d10.79410925886988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d5b4886aed%3A0x4c7c22e73e03c511!2zTm92YSBFdmVyZ3JlZW4sIDQyLzIgxJAuIE5ndXnhu4VuIFbEg24gVHLhu5dpLCBQaMaw4budbmcgMTUsIFBow7ogTmh14bqtbiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1703820725131!5m2!1svi!2s"
        width="600"
        height="450"
        loading="lazy"
        className="cash-map"
      />
    </div>
  );
};

export default PaymentCash;
