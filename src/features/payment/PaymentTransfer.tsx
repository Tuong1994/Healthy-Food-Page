import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";

const { Divider, Image, InfoRow, Space, Grid, Typography } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface PaymentTransferProps {
  lang: Lang;
}

const PaymentTransfer: React.FC<PaymentTransferProps> = ({ lang }) => {
  const infoRowProps: InfoRowProps = {
    labelSpanProps: { xs: 10, md: 10, lg: 10, span: 10 },
    textSpanProps: { xs: 14, md: 14, lg: 14, span: 14 },
  };

  return (
    <div className="payment-transfer">
      <Row justify="between">
        <Col xs={0} md={0} lg={10} span={8}>
          <Image src="/payment/transfer.webp" imgWidth="100%" />
        </Col>
        <Col xs={24} md={24} lg={14} span={16}>
          <Paragraph size={22} weight={600} variant="success">
            {lang.payment.transfer.title}
          </Paragraph>
          <Divider />
          <Paragraph size={16} align="justify" rootClassName="transfer-content">
            {lang.payment.transfer.content}
          </Paragraph>
          <Space rootClassName="transfer-content">
            <Paragraph size={16}>{lang.payment.transfer.apply}</Paragraph>
            <Paragraph size={16} variant="success" strong>
              01/01/2023
            </Paragraph>
          </Space>
          <Row gutters={[10, 20]} align="middle">
            <Col xs={0} md={5} lg={8} span={5}>
              <Image src="/payment/vib.jpg" imgWidth="100%" />
            </Col>
            <Col xs={24} md={14} lg={16} span={12}>
              <Paragraph size={20} strong rootClassName="transfer-content">
                Ngân hàng Quốc Tế VIB
              </Paragraph>
              <InfoRow {...infoRowProps} label={lang.payment.transfer.holders} text={lang.common.company} />
              <InfoRow {...infoRowProps} label={lang.payment.transfer.number} text="015.736.772" />
              <InfoRow {...infoRowProps} label={lang.payment.transfer.branch} text="VIB - HCM" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentTransfer;
