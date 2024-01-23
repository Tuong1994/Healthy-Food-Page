import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { Card, Typography } from "@/components/UI";
import { Select, TextArea } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { SelectOptions } from "@/components/Control/type";
import type { ShipmentFormData } from "@/services/shipment/type";
import type { OrderFormData } from "@/services/order/type";
import { ERecievedType } from "@/services/order/enum";
import ShipmentInfo from "./ShipmentInfo";

const { Paragraph } = Typography;

interface PaymentReceivedProps {
  lang: Lang;
  order: OrderFormData;
  shipment: ShipmentFormData | undefined;
  setOrder: Dispatch<SetStateAction<OrderFormData>>;
  setShipment: Dispatch<SetStateAction<ShipmentFormData | undefined>>;
  setOpenShipmentModal: Dispatch<SetStateAction<boolean>>;
  onShipmentFinish: (formData: ShipmentFormData | undefined) => void;
  onRemove: () => void;
}

const PaymentReceived: FC<PaymentReceivedProps> = ({
  lang,
  shipment,
  order,
  setOrder,
  setOpenShipmentModal,
  setShipment,
  onShipmentFinish,
  onRemove,
}) => {
  const options: SelectOptions = [
    { label: lang.cart.received.store, value: ERecievedType.STORE },
    { label: lang.cart.received.delivery, value: ERecievedType.DELIVERY },
  ];

  const handleSelect = (value: any) => {
    if (value === ERecievedType.DELIVERY) setOpenShipmentModal(true);
    if (value === ERecievedType.STORE) onShipmentFinish(undefined);
    setOrder((prev) => ({ ...prev, recievedType: value }));
  };

  const handleInput = (value: string) => setOrder((prev) => ({ ...prev, note: value }));

  const handleEdit = (shipment: ShipmentFormData | undefined) => {
    setShipment(shipment);
    setOpenShipmentModal(true);
  };

  return (
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
        options={options}
        defaultValue={order.recievedType}
        onChangeSelect={handleSelect}
      />

      <ShipmentInfo lang={lang} shipment={shipment} onEdit={handleEdit} onRemove={onRemove} />

      <TextArea
        color="green"
        rootClassName="received-note"
        label={lang.common.form.label.note}
        onChangeInput={handleInput}
      />
    </Card>
  );
};

export default PaymentReceived;
