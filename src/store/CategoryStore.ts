import { Category } from "@/services/category/type";
import { ApiFetchState } from "@/services/type";
import { create, StateCreator } from "zustand";

type CategoriesWithSubsResponse = {
  data: Category[];
} & ApiFetchState;

interface CategoryState {
  show: boolean;
  categories: CategoriesWithSubsResponse;
  showCategories: () => void;
  setCategories: (categories: CategoriesWithSubsResponse) => void;
}

const store: StateCreator<CategoryState> = (set) => ({
  show: false,
  categories: { loading: false, error: false, data: [] },
  showCategories: () => set((state) => ({ ...state, show: !state.show })),
  setCategories: (categories) => set((state) => ({ ...state, categories })),
});

const useCategoryStore = create(store);

export default useCategoryStore;
