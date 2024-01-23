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

const useSumPrice = (record: RecordType) => {
  const cart = useCartStore((state) => state.cart);

  let totalPrice = 0;

  const cartSumPrice = () => {
    if (!cart.data) return 0;
    const { detail: cartDetail } = cart.data;
    if (cartDetail?.items && !cartDetail?.items.length) return 0;
    const price = cartDetail?.items?.reduce((total, item) => {
      return (total += (item.product?.totalPrice ?? 0) * item.quantity);
    }, 0) || 0;
    return price;
  };

  const orderSumPrice = (order: Order) => {
    if(!order) return 0
    if (order?.items && !order?.items.length) return 0;
    const price = order?.items?.reduce((total, item) => {
      return (total += (item.product?.totalPrice ?? 0) * item.quantity);
    }, 0) || 0;
    return price;
  }

  if (record.type === "cart") totalPrice = cartSumPrice();

  if(record.type === 'order') totalPrice = orderSumPrice(record.data)

  return totalPrice;
};

export default useSumPrice;
