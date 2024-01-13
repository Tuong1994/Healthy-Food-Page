import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";

const { Divider, Image, Grid, Typography } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface PaymentCodProps {
  lang: Lang;
}

const PaymentCod: React.FC<PaymentCodProps> = ({ lang }) => {
  return (
    <div className="payment-cod">
      <Row justify="between">
        <Col xs={0} md={10} lg={8} span={6}>
          <Image src="/payment/delivery.png" imgWidth="100%" />
        </Col>
        <Col xs={24} md={14} lg={16} span={18}>
          <Paragraph size={22} weight={600} variant="success">
            {lang.payment.cod.title}
          </Paragraph>
          <Divider />
          <Paragraph size={16} align="justify">
            {lang.payment.cod.content}
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentCod;
