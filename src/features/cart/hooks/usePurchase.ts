import React from "react";
import { CartFormData, CartItem } from "@/services/cart/type";
import { createCart, updateCart } from "@/services/cart/api";
import { useLang } from "@/hooks";
import { ApiQuery } from "@/services/type";
import useCartStore from "@/store/CartStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";

const usePurchase = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const handlePurchase = async (productId: string, quantity: number) => {
    setLoading(true);
    const item = { productId, quantity, cartId: "" };
    const cartData: CartFormData = { customerId: auth.info.id ?? "", items: [item] };

    if (!cart || !cart.items || !cart.items.length) {
      const response = await createCart(cartData);
      if (!response.success) {
        setLoading(false);
        return messageApi.error(lang.common.message.error.api);
      }
      messageApi.success(lang.common.message.success.addItemCart);
      setCart(response.data);
    } else {
      let updateCartItems: CartItem[] = [...cart.items];
      const apiQuery: ApiQuery = { cartId: cart.id };
      const hasItems = updateCartItems && updateCartItems && updateCartItems.length > 0;
      if (hasItems) {
        const newItems = [...cartData.items];
        for (let i = 0; i < newItems.length; i++) {
          const newItem = newItems[i];
          const idx = updateCartItems.findIndex((item) => item.productId === newItem.productId);
          const cartItem = updateCartItems[idx];
          if (idx === -1) updateCartItems.push(newItem);
          else cartItem.quantity = newItem.quantity;
        }
        setCart({ ...cart, items: updateCartItems });
      }

      const items = updateCartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        productId: item.productId,
        cartId: cart.id ?? '',
      }));
      const response = await updateCart(apiQuery, { ...cart, items });
      if (!response.success) {
        setLoading(false);
        return messageApi.error(lang.common.message.error.api);
      }
      messageApi.success(lang.common.message.success.updateCart);
    }

    setLoading(false);
  };

  return { loading, handlePurchase };
};

export default usePurchase;
