import useCartStore from "@/store/CartStore";

type RecordType = "cart" | "order";

const useSumPrice = (type: RecordType) => {
  const cart = useCartStore((state) => state.cart);

  let totalPrice = 0;

  const cartSumPrice = () => {
    if (!cart.data) return 0;
    const { data: cartDetail } = cart.data;
    if (cartDetail.items && !cartDetail.items.length) return 0;
    const price = cartDetail.items.reduce((total, item) => {
      return (total += (item.product?.totalPrice ?? 0) * item.quantity);
    }, 0);
    return price;
  };

  if (type === "cart") totalPrice = cartSumPrice();

  return totalPrice;
};

export default useSumPrice;
