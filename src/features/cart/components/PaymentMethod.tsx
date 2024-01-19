import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { HiCheck } from "react-icons/hi2";

const { Card, Accordion, InfoRow, NoteMessage, Typography } = UI;

const { Paragraph } = Typography;

interface PaymentMethodProps {
  lang: Lang;
  onSelectedMethod?: (id: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ lang, onSelectedMethod }) => {
  const [selectedMethod, setSelectedMethod] = React.useState<string>("");

  const methods = [
    {
      id: "1",
      title: lang.cart.methods.transfer.title,
      content: (
        <React.Fragment>
          <Paragraph italic>{lang.cart.methods.transfer.content}</Paragraph>
          <InfoRow label={lang.cart.methods.transfer.holders} text={lang.common.company} />
          <InfoRow label={lang.cart.methods.transfer.number} text="015.736.772" />
          <InfoRow label={lang.cart.methods.transfer.branch} text="VIB - HCM" />
        </React.Fragment>
      ),
    },
    {
      id: "2",
      title: lang.cart.methods.cod.title,
      content: <Paragraph italic>{lang.cart.methods.cod.content}</Paragraph>,
    },
    {
      id: "3",
      title: lang.cart.methods.cash.title,
      content: <Paragraph italic>{lang.cart.methods.cash.content}</Paragraph>,
    },
  ];

  const handleSelect = (id: string) => {
    if (selectedMethod === id) return setSelectedMethod("");
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

  React.useEffect(() => {
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
      {selectedMethod === "" && <NoteMessage type="error" message={lang.cart.methods.note} />}
      {renderMethods()}
    </Card>
  );
};

export default PaymentMethod;
