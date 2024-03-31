import { create, StateCreator } from "zustand";
import { CartWithItemsPaging } from "@/services/cart/type";
import { ApiFetchState } from "@/services/type";

type CartResponse = {
  data: CartWithItemsPaging | undefined;
} & ApiFetchState;

interface CartState {
  cart: CartResponse;
  quickCart: CartResponse;
  setCart: (cart: CartResponse) => void;
  setQuickCart: (quickCart: CartResponse) => void;
  resetCart: () => void;
}

const defaultCart = { loading: false, error: false, data: undefined };

const store: StateCreator<CartState> = (set) => ({
  cart: defaultCart,
  quickCart: defaultCart,
  setCart: (cart) => set((state) => ({ ...state, cart })),
  setQuickCart: (quickCart) => set((state) => ({ ...state, quickCart })),
  resetCart: () => set((state) => ({ ...state, cart: defaultCart, quickCart: defaultCart })),
});

const useCartStore = create(store);

export default useCartStore;
