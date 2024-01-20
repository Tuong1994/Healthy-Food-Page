import { FC, useMemo } from "react";
import { Card, Grid, Typography } from "@/components/UI";
import { HiCreditCard, HiTruck } from "react-icons/hi2";
import { HiCash } from "react-icons/hi";
import type { Lang } from "@/common/type";

const { Row, Col } = Grid;

const { Paragraph } = Typography;

const ICON_SIZE = 40;

interface PaymentMethodsProps {
  lang: Lang;
}

const PaymentMethods: FC<PaymentMethodsProps> = ({ lang }) => {
  const iconProps = { size: ICON_SIZE, className: "item-icon" };

  const methods = useMemo(
    () => [
      {
        id: "1",
        title: lang.payment.methods.transfer.title,
        content: lang.payment.methods.transfer.content,
        icon: <HiCreditCard {...iconProps} />,
      },
      {
        id: "2",
        title: lang.payment.methods.cod.title,
        content: lang.payment.methods.cod.content,
        icon: <HiTruck {...iconProps} />,
      },
      {
        id: "3",
        title: lang.payment.methods.cash.title,
        content: lang.payment.methods.cash.content,
        icon: <HiCash {...iconProps} />,
      },
    ],
    [lang]
  );

  const renderMethods = () => {
    return methods.map((method) => (
      <Col key={method.id} xs={24} md={12} lg={12} span={8}>
        <Card
          hoverable
          rootClassName="methods-item"
          headClassName="item-head"
          bodyClassName="item-body"
          head={
            <Paragraph size={16} weight={600}>
              {method.title}
            </Paragraph>
          }
        >
          <Row gutters={[10, 20]} align="middle" justify="center">
            <Col xs={4} md={4} lg={4} span={4}>
              {method.icon}
            </Col>
            <Col xs={18} md={18} lg={18} span={18}>
              <Paragraph>{method.content}</Paragraph>
            </Col>
          </Row>
        </Card>
      </Col>
    ));
  };

  return (
    <div className="payment-methods">
      <Row gutters={[10, 15]} justify="center">
        {renderMethods()}
      </Row>
    </div>
  );
};

export default PaymentMethods;
