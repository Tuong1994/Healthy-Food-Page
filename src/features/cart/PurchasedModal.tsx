import React from "react";
import { UI } from "@/components";
import { ModalProps } from "@/components/UI/Modal";
import { Lang } from "@/common/type";
import { Columns } from "@/components/UI/Table/type";
import { ELang } from "@/common/enum";
import ShipmentInfo from "./ShipmentInfo";
import PaymentInfo from "./PaymentInfo";
import utils from "@/utils";

const { Modal, Card, Divider, Table, Image, Badge, Typography } = UI;

const { Paragraph } = Typography;

interface Data {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface PurchasedModalProps extends ModalProps {
  type: ELang;
  lang: Lang;
}

const PurchasedModal: React.FC<PurchasedModalProps> = ({ type, lang, ...restProps }) => {
  const dataSource: Data[] = [
    { id: "1", name: "Product 1", quantity: 1, price: 100000 },
    { id: "2", name: "Product 2", quantity: 5, price: 200000 },
    { id: "3", name: "Product 3", quantity: 3, price: 500000 },
  ];

  const columns: Columns<Data> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "id",
      render: () => <Image imgWidth={50} imgHeight={50} />,
    },
    {
      id: "name",
      title: lang.common.table.head.productName,
      dataIndex: "name",
    },
    {
      id: "quantity",
      title: lang.common.table.head.quantity,
      dataIndex: "quantity",
    },
    {
      id: "price",
      title: lang.common.table.head.price,
      dataIndex: "price",
      render: (data) => <>{utils.formatPrice(type, data)}</>,
    },
  ];

  return (
    <Modal
      head={<Paragraph size={16}>{lang.cart.purchased.title}</Paragraph>}
      sizes="sm"
      color="green"
      {...restProps}
    >
      <Table<Data> color="green" dataSource={dataSource} columns={columns} />

      <Divider />

      <Card
        head={
          <Paragraph weight={600} size={16}>
            {lang.cart.methods.title}
          </Paragraph>
        }
      >
        <Badge color="green">{lang.cart.methods.transfer.title}</Badge>
      </Card>

      <Divider />

      <Card
        head={
          <Paragraph weight={600} size={16}>
            {lang.cart.received.title}
          </Paragraph>
        }
      >
        <ShipmentInfo lang={lang} />
      </Card>

      <Divider />

      <PaymentInfo lang={lang} />
    </Modal>
  );
};

export default PurchasedModal;
