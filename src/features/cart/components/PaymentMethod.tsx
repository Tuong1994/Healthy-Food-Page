import { FC, Fragment } from "react";
import { Card, Accordion, InfoRow, NoteMessage, Typography } from "@/components/UI";
import { HiCheck } from "react-icons/hi2";
import { EPaymentMethod } from "@/services/order/enum";
import type { Lang } from "@/common/type";
import type { OrderFormData } from "@/services/order/type";

const { Paragraph } = Typography;

interface PaymentMethodProps {
  lang: Lang;
  order: OrderFormData;
  onSelectedMethod: (method: EPaymentMethod) => void;
}

const PaymentMethod: FC<PaymentMethodProps> = ({ lang, order, onSelectedMethod }) => {
  const methods = [
    {
      id: EPaymentMethod.TRANSFER,
      title: lang.cart.methods.transfer.title,
      content: (
        <Fragment>
          <Paragraph italic>{lang.cart.methods.transfer.content}</Paragraph>
          <InfoRow label={lang.cart.methods.transfer.holders} text={lang.common.company} />
          <InfoRow label={lang.cart.methods.transfer.number} text="015.736.772" />
          <InfoRow label={lang.cart.methods.transfer.branch} text="VIB - HCM" />
        </Fragment>
      ),
    },
    {
      id: EPaymentMethod.COD,
      title: lang.cart.methods.cod.title,
      content: <Paragraph italic>{lang.cart.methods.cod.content}</Paragraph>,
    },
    {
      id: EPaymentMethod.CASH,
      title: lang.cart.methods.cash.title,
      content: <Paragraph italic>{lang.cart.methods.cash.content}</Paragraph>,
    },
  ];

  const handleSelect = (method: EPaymentMethod) => onSelectedMethod(method);

  const renderMethods = () => {
    return methods.map((method) => {
      const isSelected = order.paymentMethod === method.id;
      const extra = isSelected ? <HiCheck size={18} /> : null;
      const selectedClassName = isSelected ? "method-item-selected" : "";
      return (
        <Accordion
          type="group"
          extra={extra}
          key={method.id}
          label={method.title}
          isCollapsed={order.paymentMethod === method.id}
          rootClassName={`method-item ${selectedClassName}`}
          onClick={() => handleSelect(method.id)}
        >
          {method.content}
        </Accordion>
      );
    });
  };

  return (
    <Card
      rootClassName="card-container payment-method"
      head={
        <Paragraph weight={600} size={16}>
          {lang.cart.methods.title}
        </Paragraph>
      }
    >
      {order.paymentMethod === -1 && <NoteMessage type="error" message={lang.cart.methods.note} />}
      {renderMethods()}
    </Card>
  );
};

export default PaymentMethod;
