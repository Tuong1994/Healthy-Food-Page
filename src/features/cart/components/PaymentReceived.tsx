import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { Card, Typography } from "@/components/UI";
import { Select, TextArea } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { SelectOptions } from "@/components/Control/type";
import type { ShipmentFormData } from "@/services/shipment/type";
import type { OrderFormData } from "@/services/order/type";
import { EReceivedType } from "@/services/order/enum";
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
    { label: lang.cart.received.store, value: EReceivedType.STORE },
    { label: lang.cart.received.delivery, value: EReceivedType.DELIVERY },
  ];

  const handleSelect = (value: any) => {
    if (value === EReceivedType.DELIVERY) setOpenShipmentModal(true);
    if (value === EReceivedType.STORE) onShipmentFinish(undefined);
    setOrder((prev) => ({ ...prev, receivedType: value }));
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
      rootClassName="card-container payment-received"
    >
      <Select
        color="green"
        rootClassName="received-select"
        hasClear={false}
        hasSearch={false}
        options={options}
        defaultValue={order.receivedType}
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
