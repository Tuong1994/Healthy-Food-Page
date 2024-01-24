import { create, StateCreator } from "zustand";
import type { Product } from "@/services/product/type";

interface ProductState {
  product: Product;
  setProduct: (product: Product) => void;
}

const store: StateCreator<ProductState> = (set) => ({
  product: {} as Product,
  setProduct: (product) => set((state) => ({ ...state, product })),
});

const useProductStore = create(store);

export default useProductStore;
