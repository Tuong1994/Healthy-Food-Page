import { FC, useState } from "react";
import { Table, Image, Pagination, Divider, Grid, Typography } from "@/components/UI";
import type { Columns } from "@/components/UI/Table/type";
import type { CartItem } from "@/services/cart/type";
import type { Product } from "@/services/product/type";
import type { Order } from "@/services/order/type";
import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "@/services/order/enum";
import { useLang } from "@/hooks";
import PaymentMethod from "./PaymentMethod";
import PaymentReceived from "./PaymentReceived";
import PaymentInfo from "./PaymentInfo";
import PaymentActions from "./PaymentActions";
import PurchasedModal from "./PurchasedModal";
import useCartStore from "@/store/CartStore";
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

  const cart = useCartStore((state) => state.cart);

  const { data: cartResponse } = cart;

  const orderItems = cartResponse?.data.items
    ? cartResponse?.data.items.map((item) => ({
        quantity: item.quantity,
        productId: item.productId,
        orderId: "",
      }))
    : [];

  const [open, setOpen] = useState<boolean>(false);

  const [order, setOrder] = useState<Order>({
    paymentMethod: -1,
    status: EOrderStatus.WAITTING,
    paymentStatus: EPaymentStatus.UNPAID,
    customerId: "",
    note: "",
    items: orderItems,
  });

  const dataSource = (): CartItem[] => {
    if (!cart.data) return [];
    const { data: cartDetail } = cart.data;
    return cartDetail.items.map((item) => ({ ...item })) || [];
  };

  const columns: Columns<CartItem> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "product",
      render: (product: Product) => <Image imgWidth={50} imgHeight={50} />,
    },
    {
      id: "name",
      title: lang.common.table.head.productName,
      dataIndex: "product",
      render: (product: Product) => <>{product.name}</>,
    },
    {
      id: "quantity",
      title: lang.common.table.head.quantity,
      dataIndex: "quantity",
    },
    {
      id: "price",
      title: lang.common.table.head.price,
      dataIndex: "product",
      render: (product: Product) => <>{utils.formatPrice(locale, product.totalPrice)}</>,
    },
  ];

  const handleSelectMethod = (method: EPaymentMethod) => {
    setOrder((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleOrder = () => {
    setOpen(true);
    console.log(order);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="cart-payment">
      <Title level={6}>{lang.cart.finish}</Title>
      <Row gutters={[10, 20]} justify="between">
        <Col xs={24} md={24} lg={14} span={14}>
          <Table<CartItem> color="green" dataSource={dataSource()} columns={columns} />
          <Pagination
            ghost
            color="green"
            shape="square"
            total={cartResponse?.totalItems}
            rootClassName="payment-pagination"
          />
          <Divider />
          <PaymentReceived lang={lang} />
        </Col>
        <Col xs={24} md={24} lg={10} span={10}>
          <PaymentMethod lang={lang} onSelectedMethod={handleSelectMethod} />
          <PaymentInfo locale={locale} lang={lang} />
          <PaymentActions lang={lang} handleUnConfirm={handleUnConfirm} handleOrder={handleOrder} />
        </Col>
      </Row>

      <PurchasedModal lang={lang} locale={locale} open={open} onCancel={handleCloseModal} />
    </div>
  );
};

export default CartPayment;
