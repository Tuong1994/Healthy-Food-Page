import { create, StateCreator } from "zustand";
import type { Product } from "@/services/product/type";
import type { ApiResponse, Paging } from "@/services/type";

interface ProductState {
  productsByCategories: ApiResponse<Paging<Product>>[];
  productsPaging: Paging<Product>;
  product: Product;
  setProductsByCategories: (data: ApiResponse<Paging<Product>>[]) => void;
  setProductsPaging: (data: Paging<Product>) => void;
  setProduct: (product: Product) => void;
}

const store: StateCreator<ProductState> = (set) => ({
  productsByCategories: [],
  productsPaging: { totalItems: 0, page: 0, limit: 0, items: [] },
  product: {} as Product,
  setProductsByCategories: (data) => set((state) => ({ ...state, productsByCategories: data })),
  setProductsPaging: (data) => set((state) => ({ ...state, productsPaging: data })),
  setProduct: (product) => set((state) => ({ ...state, product })),
});

const useProductStore = create(store);

export default useProductStore;
