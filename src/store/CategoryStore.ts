import { create, StateCreator } from "zustand";

interface CategoryState {
  show: boolean;
  showCategories: () => void;
}

const store: StateCreator<CategoryState> = (set) => ({
  show: false,
  showCategories: () => set((state) => ({ ...state, show: !state.show })),
});

const useCategoryStore = create(store);

export default useCategoryStore;
