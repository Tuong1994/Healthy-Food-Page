import { useState } from "react";
import type { Cart, CartFormData, CartItem } from "@/services/cart/type";
import type { ApiQuery } from "@/services/type";
import { createCart, updateCart } from "@/services/cart/api";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import { cartSwrKey } from "@/components/Page/AppMain/AppData/swrkey";
import { mutate } from "swr";
import useCartStore from "@/store/CartStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";

const usePurchase = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const { query } = useRouter();

  const auth = useAuthStore((state) => state.auth);

  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);

  const [loading, setLoading] = useState<boolean>(false);

  const mutateKey = cartSwrKey(auth.info?.id, query.page, query.limit, query.langCode);

  const onCreateCart = async (cartData: CartFormData) => {
    const response = await createCart(cartData);
    if (!response.success) {
      if (response.error?.status === 0) {
        console.log("Too many request, action canceled");
        return;
      }
      setLoading(false);
      return messageApi.error(lang.common.message.error.api);
    }
    messageApi.success(lang.common.message.success.addItemCart);
    mutate(mutateKey);
  };

  const onUpdateCart = async (cartDetail: Cart, cartData: CartFormData) => {
    if (!cart.data) return;
    const { totalItems } = cart.data;
    const apiQuery: ApiQuery = { cartId: cartDetail.id };
    const updateCartItems: CartItem[] = [...cartDetail.items];
    const hasItems = updateCartItems && updateCartItems.length > 0;
    if (hasItems) {
      const newItems = [...cartData.items];
      for (let i = 0; i < newItems.length; i++) {
        const newItem = newItems[i];
        const idx = updateCartItems.findIndex((item) => item.productId === newItem.productId);
        const cartItem = updateCartItems[idx];
        if (idx === -1) updateCartItems.push(newItem);
        else cartItem.quantity = newItem.quantity;
      }
      const updatedCart = {
        ...cart,
        data: { totalItems, detail: { ...cartDetail, items: updateCartItems } },
      };
      setCart(updatedCart);
    }

    const items = updateCartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      productId: item.productId,
      cartId: cartDetail.id ?? "",
    }));
    const response = await updateCart(apiQuery, { ...cartDetail, items });
    if (!response.success) {
      if (response.error?.status === 0) {
        console.log("Too many request, action canceled");
        return;
      }
      setLoading(false);
      return messageApi.error(lang.common.message.error.api);
    }
    messageApi.success(lang.common.message.success.updateCart);
    mutate(mutateKey);
  };

  const handlePurchase = async (productId: string, quantity: number) => {
    if (!cart.data) return;
    setLoading(true);
    const { detail: cartDetail } = cart.data;
    const item = { productId, quantity, cartId: "" };
    const cartData: CartFormData = { userId: auth.info.id ?? "", items: [item] };
    if (!cartDetail || !cartDetail.items || !cartDetail.items.length) await onCreateCart(cartData);
    else await onUpdateCart(cartDetail, cartData);
    setLoading(false);
  };

  return { loading, handlePurchase };
};

export default usePurchase;
