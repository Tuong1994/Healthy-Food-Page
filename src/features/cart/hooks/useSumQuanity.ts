import useCartStore from "@/store/CartStore";
import type { Order } from "@/services/order/type";

type CartSumType = {
  type: "cart";
  isPaging?: boolean;
};

type OrderSumType = {
  type: "order";
  data: Order;
};

type RecordType = CartSumType | OrderSumType;

const useSumQuantity = (record: RecordType) => {
  const [cart, quickCart] = useCartStore((state) => [state.cart, state.quickCart]);

  let totalQuantity = 0;

  const cartSumQuantity = (isPaging: boolean) => {
    if (!cart.data || !quickCart.data) return 0;
    const { detail: cartData } = cart.data;
    const { detail: quickCartData } = quickCart.data;
    const cartDetail = isPaging ? cartData : quickCartData;
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

  if (record.type === "cart") totalQuantity = cartSumQuantity(record.isPaging as boolean);

  if (record.type === "order") totalQuantity = orderSumQuantity(record.data);

  return totalQuantity;
};

export default useSumQuantity;
