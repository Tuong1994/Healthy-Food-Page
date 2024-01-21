import useCartStore from "@/store/CartStore";

const useQuantity = (productId: string) => {
  const cart = useCartStore((state) => state.cart);

  let quantity = 0;

  if (!cart.data) return;
  
  const { data: cartDetail } = cart.data;

  if (cartDetail.items && !cartDetail.items.length) return;

  const idx = cartDetail.items.findIndex((item) => item.productId === productId);
  if (idx !== -1) quantity = cartDetail.items[idx].quantity;

  return quantity;
};

export default useQuantity;
