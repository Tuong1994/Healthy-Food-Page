import useCartStore from "@/store/CartStore";
import type { Order } from "@/services/order/type";

type CartSumType = {
  type: "cart";
};

type OrderSumType = {
  type: "order";
  data: Order;
};

type RecordType = CartSumType | OrderSumType;

const useSumQuantity = (record: RecordType) => {
  const cart = useCartStore((state) => state.cart);

  let totalQuantity = 0;

  const cartSumQuantity = () => {
    if (!cart.data) return 0;
    const { detail: cartDetail } = cart.data;
    if (cartDetail?.items && !cartDetail?.items.length) return 0;
    const quantity =
      cartDetail?.items?.reduce((total, item) => {
        return (total += item.quantity);
      }, 0) || 0;
    return quantity;
  };

  const orderSumQuantity = (order: Order) => {
    if (!order) return 0;
    if (order?.items && !order?.items.length) return 0;
    const quantity =
      order?.items?.reduce((total, item) => {
        return (total += item.quantity);
      }, 0) || 0;
    return quantity;
  };

  if (record.type === "cart") totalQuantity = cartSumQuantity();

  if (record.type === "order") totalQuantity = orderSumQuantity(record.data);

  return totalQuantity;
};

export default useSumQuantity;
