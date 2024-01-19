import { create, StateCreator } from "zustand";
import { Cart } from "@/services/cart/type";

interface CartState {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  resetCart: () => void;
}

const store: StateCreator<CartState> = (set) => ({
  cart: null,
  setCart: (cart) => set((state) => ({ ...state, cart })),
  resetCart: () => set((state) => ({ ...state, cart: null })),
});

const useCartStore = create(store);

export default useCartStore;
