import { FC, Fragment, useState } from "react";
import { Card, Typography } from "@/components/UI";
import { Select, TextArea } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { SelectOptions } from "@/components/Control/type";
import ShipmentModal from "./ShipmentModal";
import ShipmentInfo from "./ShipmentInfo";

const { Paragraph } = Typography;

interface PaymentReceivedProps {
  lang: Lang;
}

const PaymentReceived: FC<PaymentReceivedProps> = ({ lang }) => {
  const [received, setReceived] = useState<string>("store");

  const options: SelectOptions = [
    { label: lang.cart.received.store, value: "store" },
    { label: lang.cart.received.delivery, value: "delivery" },
  ];

  const handleSelect = (value: any) => setReceived(value);

  const handleReset = () => setReceived("store");

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default PaymentReceived;
