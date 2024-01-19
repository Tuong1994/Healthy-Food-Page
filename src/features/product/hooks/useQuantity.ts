import useCartStore from "@/store/CartStore";

const useQuantity = (productId: string) => {
  const cart = useCartStore((state) => state.cart);

  let quantity = 0;

  if (!cart) return;
  if (cart.items && !cart.items.length) return;

  const idx = cart.items.findIndex((item) => item.productId === productId);
  if (idx !== -1) quantity = cart.items[idx].quantity;

  return quantity;
};

export default useQuantity;
