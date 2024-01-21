import { create, StateCreator } from "zustand";
import { CartWithItemsPaging } from "@/services/cart/type";
import { ApiFetchState } from "@/services/type";

type CartResponse = {
  data: CartWithItemsPaging | undefined;
} & ApiFetchState;

interface CartState {
  cart: CartResponse;
  setCart: (cart: CartResponse) => void;
  resetCart: () => void;
}

const defaultCart = { loading: false, error: false, data: undefined };

const store: StateCreator<CartState> = (set) => ({
  cart: defaultCart,
  setCart: (cart) => set((state) => ({ ...state, cart })),
  resetCart: () => set((state) => ({ ...state, cart: defaultCart })),
});

const useCartStore = create(store);

export default useCartStore;
