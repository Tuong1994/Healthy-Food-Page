import { FC, useState } from "react";
import { Table, Image, Pagination, Divider, Grid, Typography } from "@/components/UI";
import { useLang } from "@/hooks";
import type { Columns } from "@/components/UI/Table/type";
import PaymentMethod from "./PaymentMethod";
import PaymentReceived from "./PaymentReceived";
import PaymentInfo from "./PaymentInfo";
import PaymentActions from "./PaymentActions";
import PurchasedModal from "./PurchasedModal";
import utils from "@/utils";

const { Row, Col } = Grid;

const { Title } = Typography;

interface Data {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartPaymentProps {
  handleUnConfirm: () => void;
}

const CartPayment: FC<CartPaymentProps> = ({ handleUnConfirm }) => {
  const { locale, lang } = useLang();

  const [open, setOpen] = useState<boolean>(false);

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
      render: (data) => <>{utils.formatPrice(locale, data)}</>,
    },
  ];

  const handleOrder = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="cart-payment">
      <Title level={6}>{lang.cart.finish}</Title>
      <Row gutters={[10, 20]} justify="between">
        <Col xs={24} md={24} lg={14} span={14}>
          <Table<Data> color="green" dataSource={dataSource} columns={columns} />
          <Pagination color="green" shape="square" ghost rootClassName="payment-pagination" />
          <Divider />
          <PaymentReceived lang={lang} />
        </Col>
        <Col xs={24} md={24} lg={10} span={10}>
          <PaymentMethod lang={lang} />
          <PaymentInfo lang={lang} />
          <PaymentActions lang={lang} handleUnConfirm={handleUnConfirm} handleOrder={handleOrder} />
        </Col>
      </Row>

      <PurchasedModal lang={lang} locale={locale} open={open} onCancel={handleCloseModal} />
    </div>
  );
};

export default CartPayment;
