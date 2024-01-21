import useCartStore from "@/store/CartStore";

type RecordType = "cart" | "order";

const useSumQuantity = (type: RecordType) => {
  const cart = useCartStore((state) => state.cart);

  let totalQuantity = 0;

  const cartSumQuantity = () => {
    if (!cart.data) return 0;
    const { data: cartDetail } = cart.data;
    if (cartDetail.items && !cartDetail.items.length) return 0;
    const quantity = cartDetail.items.reduce((total, item) => {
      return (total += item.quantity);
    }, 0);
    return quantity;
  };

  if (type === "cart") totalQuantity = cartSumQuantity();

  return totalQuantity;
};

export default useSumQuantity;
