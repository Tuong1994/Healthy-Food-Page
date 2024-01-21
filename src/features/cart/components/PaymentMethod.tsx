import { FC, Fragment, useState, useEffect } from "react";
import { Card, Accordion, InfoRow, NoteMessage, Typography } from "@/components/UI";
import { HiCheck } from "react-icons/hi2";
import { EPaymentMethod } from "@/services/order/enum";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface PaymentMethodProps {
  lang: Lang;
  onSelectedMethod?: (method: EPaymentMethod) => void;
}

const PaymentMethod: FC<PaymentMethodProps> = ({ lang, onSelectedMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<EPaymentMethod | number>(-1);

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

  const handleSelect = (id: EPaymentMethod) => {
    if (selectedMethod === id) return setSelectedMethod(-1);
    setSelectedMethod(id);
  };

  const renderMethods = () => {
    return methods.map((method) => {
      const isSelected = selectedMethod === method.id;
      const extra = isSelected ? <HiCheck size={18} /> : null;
      const selectedClassName = isSelected ? "method-item-selected" : "";
      return (
        <Accordion
          type="group"
          extra={extra}
          key={method.id}
          label={method.title}
          isCollapsed={selectedMethod === method.id}
          rootClassName={`method-item ${selectedClassName}`}
          onClick={() => handleSelect(method.id)}
        >
          {method.content}
        </Accordion>
      );
    });
  };

  useEffect(() => {
    onSelectedMethod?.(selectedMethod);
  }, [selectedMethod]);

  return (
    <Card
      rootClassName="payment-method"
      head={
        <Paragraph weight={600} size={16}>
          {lang.cart.methods.title}
        </Paragraph>
      }
    >
      {selectedMethod === -1 && <NoteMessage type="error" message={lang.cart.methods.note} />}
      {renderMethods()}
    </Card>
  );
};

export default PaymentMethod;
