import React from "react";
import { UI, Control } from "@/components";
import { Lang } from "@/common/type";
import { SelectOptions } from "@/components/Control/type";
import ShipmentModal from "./ShipmentModal";
import ShipmentInfo from "./ShipmentInfo";

const { Card, Typography } = UI;

const { Select, TextArea } = Control;

const { Paragraph } = Typography;

interface PaymentReceivedProps {
  lang: Lang;
}

const PaymentReceived: React.FC<PaymentReceivedProps> = ({ lang }) => {
  const [received, setReceived] = React.useState<string>("store");

  const options: SelectOptions = [
    { label: lang.cart.received.store, value: "store" },
    { label: lang.cart.received.delivery, value: "delivery" },
  ];

  const handleSelect = (value: any) => setReceived(value);

  const handleReset = () => setReceived("store");

  return (
    <React.Fragment>
      <Card
        head={
          <Paragraph weight={600} size={16}>
            {lang.cart.received.title}
          </Paragraph>
        }
        rootClassName="payment-received"
      >
        <Select
          rootClassName="received-select"
          color="green"
          hasClear={false}
          hasSearch={false}
          defaultValue={received}
          options={options}
          onChangeSelect={handleSelect}
        />

        <ShipmentInfo lang={lang} />

        <TextArea color="green" label={lang.common.form.label.note} />
      </Card>

      <ShipmentModal open={received === "delivery"} onCancel={handleReset} />
    </React.Fragment>
  );
};

export default PaymentReceived;
