import { Dispatch, FC, SetStateAction, useState } from "react";
import { Table, Image, Pagination, Divider, Grid, Typography } from "@/components/UI";
import type { Columns } from "@/components/UI/Table/type";
import type { CartItem, CartWithItemsPaging } from "@/services/cart/type";
import type { Product } from "@/services/product/type";
import type { OrderFormData } from "@/services/order/type";
import type { ShipmentFormData } from "@/services/shipment/type";
import type { Purchased } from "@/pages/cart";
import type { EmailOrder } from "@/services/email/type";
import type { ApiQuery } from "@/services/type";
import { EOrderStatus, EPaymentMethod, EPaymentStatus, EReceivedType } from "@/services/order/enum";
import { createOrder } from "@/services/order/api";
import { removeCarts } from "@/services/cart/api";
import { emailOrder } from "@/services/email/api";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import PaymentMethod from "./PaymentMethod";
import PaymentReceived from "./PaymentReceived";
import PaymentInfo from "./PaymentInfo";
import PaymentActions from "./PaymentActions";
import ShipmentModal from "./ShipmentModal";
import Link from "next/link";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useSumPrice from "../hooks/useSumPrice";
import useSumQuantity from "../hooks/useSumQuanity";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import getTotalPayment from "../helper/getTotalPayment";
import url from "@/common/constant/url";
import utils from "@/utils";

const { CART, PRODUCT_DETAIL } = url;

const { Row, Col } = Grid;

const { Title } = Typography;

interface CartPaymentProps {
  cart: CartWithItemsPaging | undefined;
  setPurchased: Dispatch<SetStateAction<Purchased>>;
  handleUnConfirm: () => void;
}

const CartPayment: FC<CartPaymentProps> = ({ cart, setPurchased, handleUnConfirm }) => {
  const messageApi = useMessage();

  const auth = useAuthStore((state) => state.auth);

  const resetCart = useCartStore((state) => state.resetCart);

  const { locale, lang } = useLang();

  const { query, push: routerPush } = useRouter();

  const { info } = auth;

  const orderItems = cart?.detail?.items
    ? cart?.detail?.items.map((item) => ({
        quantity: item.quantity,
        productId: item.productId,
        orderId: "",
      }))
    : [];

  const [order, setOrder] = useState<OrderFormData>({
    paymentMethod: -1,
    status: EOrderStatus.WAITTING,
    paymentStatus: EPaymentStatus.UNPAID,
    receivedType: EReceivedType.STORE,
    customerId: info.id ?? "",
    note: "",
    shipmentFee: 0,
    totalPayment: 0,
    items: orderItems,
  });

  const [shipment, setShipment] = useState<ShipmentFormData | undefined>(undefined);

  const [openShipmentModal, setOpenShipmentModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const totalPrice = useSumPrice({ type: "cart" });

  const totalQuantity = useSumQuantity({ type: "cart" });

  const hasShipmentFee = totalPrice < 100000 && Boolean(shipment);

  const shipmentFee = hasShipmentFee ? 50000 : 0;

  const { paymentBeforeTax, taxFee, totalPayment } = getTotalPayment(totalPrice, shipmentFee);

  const dataSource = (): CartItem[] => {
    if (!cart) return [];
    const { detail: cartDetail } = cart;
    return cartDetail?.items.map((item) => ({ ...item })) || [];
  };

  const columns: Columns<CartItem> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "product",
      render: (product: Product) => <Image src={product.image?.path} imgWidth={50} imgHeight={50} />,
    },
    {
      id: "name",
      title: lang.common.table.head.productName,
      dataIndex: "product",
      render: (product: Product) => (
        <Link
          className="payment-product-link"
          href={{ pathname: PRODUCT_DETAIL, query: { id: product.id, langCode: locale } }}
        >
          {product.name}
        </Link>
      ),
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

  const handleChangePage = (page: number) => {
    routerPush({ pathname: CART, query: { ...query, page } });
  };

  const handleCloseShipmenModal = () => {
    setOpenShipmentModal(false);
    setShipment(undefined);
    setOrder((prev) => ({ ...prev, receivedType: EReceivedType.STORE, paymentMethod: -1 }));
  };

  const handleSelectMethod = (method: EPaymentMethod) => {
    if (order.paymentMethod === method) return setOrder((prev) => ({ ...prev, paymentMethod: -1 }));
    if (method === EPaymentMethod.COD) {
      setOpenShipmentModal(true);
      setOrder((prev) => ({ ...prev, receivedType: EReceivedType.DELIVERY }));
    }
    setOrder((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleShipment = (formData: ShipmentFormData | undefined) => setShipment(formData);

  const handleOrder = async () => {
    setLoading(true);
    const orderFormData = !shipment
      ? { ...order, totalPayment }
      : { ...order, shipment, shipmentFee, totalPayment };
    const response = await createOrder(orderFormData);
    if (!response.success) return messageApi.error(lang.common.message.error.payment);
    await removeCarts({ ids: cart?.detail?.id });
    const apiQuery: ApiQuery = { langCode: locale };
    const emailData: EmailOrder = {
      email: info.email,
      items: order.items,
      order: orderFormData,
      shipment,
    };
    await emailOrder(apiQuery, emailData);
    setPurchased((prev) => ({ ...prev, open: true, data: response.data }));
    setLoading(false);
    resetCart();
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
            total={cart?.totalItems}
            rootClassName="payment-pagination"
            onChangePage={handleChangePage}
          />
          <Divider />
          <PaymentReceived
            lang={lang}
            order={order}
            shipment={shipment}
            setOrder={setOrder}
            setShipment={setShipment}
            onShipmentFinish={handleShipment}
            onRemove={handleCloseShipmenModal}
            setOpenShipmentModal={setOpenShipmentModal}
          />
        </Col>
        <Col xs={24} md={24} lg={10} span={10}>
          <PaymentMethod lang={lang} order={order} onSelectedMethod={handleSelectMethod} />
          <PaymentInfo
            locale={locale}
            lang={lang}
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
            paymentBeforeTax={paymentBeforeTax}
            taxFee={taxFee}
            totalPayment={totalPayment}
            shipmentFee={shipmentFee}
          />
          <PaymentActions
            lang={lang}
            order={order}
            loading={loading}
            handleUnConfirm={handleUnConfirm}
            handleOrder={handleOrder}
          />
        </Col>
      </Row>

      <ShipmentModal
        open={openShipmentModal}
        defaultData={shipment}
        setOpenModal={setOpenShipmentModal}
        onFinish={handleShipment}
        onCancel={handleCloseShipmenModal}
      />
    </div>
  );
};

export default CartPayment;
