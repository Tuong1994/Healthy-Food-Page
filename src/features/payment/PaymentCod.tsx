import { FC } from "react";
import { Divider, Image, Grid, Typography, Card } from "@/components/UI";
import type { Lang } from "@/common/type";

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface PaymentCodProps {
  lang: Lang;
}

const PaymentCod: FC<PaymentCodProps> = ({ lang }) => {
  return (
    <div className="payment-cod">
      <Row justify="between">
        <Col xs={0} md={10} lg={8} span={6}>
          <Image src="/payment/delivery.png" imgWidth="100%" />
        </Col>
        <Col xs={24} md={14} lg={16} span={18}>
          <Card rootClassName="card-container">
            <Paragraph size={22} weight={600} variant="success">
              {lang.payment.cod.title}
            </Paragraph>
            <Divider />
            <Paragraph size={18} align="justify">
              {lang.payment.cod.content}
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentCod;
