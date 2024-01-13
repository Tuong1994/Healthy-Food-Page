import { create, StateCreator } from "zustand";
import { Category } from "@/services/category/type";

interface CategoryState {
  show: boolean;
  categoriesWithSub: Category[];
  showCategories: () => void;
  setCategoriesWithSub: (items: Category[]) => void;
}

const data = [
  {
    id: "1",
    name: "Category 1",
    subCategories: [
      { id: "1", name: "subcategory 1", categoryId: "" },
      { id: "2", name: "subcategory 2", categoryId: "" },
      { id: "3", name: "subcategory 3", categoryId: "" },
      { id: "4", name: "subcategory 4", categoryId: "" },
    ],
  },
  {
    id: "2",
    name: "Category 2",
    subCategories: [
      { id: "1", name: "subcategory 1", categoryId: "" },
      { id: "2", name: "subcategory 2", categoryId: "" },
      { id: "3", name: "subcategory 3", categoryId: "" },
      { id: "4", name: "subcategory 4", categoryId: "" },
      { id: "5", name: "subcategory 5", categoryId: "" },
    ],
  },
  {
    id: "3",
    name: "Category 3",
    subCategories: [
      { id: "1", name: "subcategory 1", categoryId: "" },
      { id: "2", name: "subcategory 2", categoryId: "" },
      { id: "3", name: "subcategory 3", categoryId: "" },
      { id: "4", name: "subcategory 4", categoryId: "" },
      { id: "5", name: "subcategory 5", categoryId: "" },
      { id: "6", name: "subcategory 6", categoryId: "" },
    ],
  },
  {
    id: "4",
    name: "Category 4",
    subCategories: [
      { id: "1", name: "subcategory 1", categoryId: "" },
      { id: "2", name: "subcategory 2", categoryId: "" },
      { id: "3", name: "subcategory 3", categoryId: "" },
    ],
  },
  {
    id: "5",
    name: "Category 5",
    subCategories: [
      { id: "1", name: "subcategory 1", categoryId: "" },
      { id: "2", name: "subcategory 2", categoryId: "" },
      { id: "3", name: "subcategory 3", categoryId: "" },
      { id: "4", name: "subcategory 4", categoryId: "" },
      { id: "5", name: "subcategory 5", categoryId: "" },
      { id: "6", name: "subcategory 6", categoryId: "" },
      { id: "7", name: "subcategory 7", categoryId: "" },
    ],
  },
  {
    id: "6",
    name: "Category 6",
    subCategories: [
      { id: "1", name: "subcategory 1", categoryId: "" },
      { id: "2", name: "subcategory 2", categoryId: "" },
    ],
  },
  {
    id: "7",
    name: "Category 7",
    subCategories: [
      { id: "1", name: "subcategory 1", categoryId: "" },
      { id: "2", name: "subcategory 2", categoryId: "" },
      { id: "3", name: "subcategory 3", categoryId: "" },
    ],
  },
  {
    id: "8",
    name: "Category 8",
    subCategories: [
      { id: "1", name: "subcategory 1", categoryId: "" },
      { id: "2", name: "subcategory 2", categoryId: "" },
      { id: "3", name: "subcategory 3", categoryId: "" },
      { id: "4", name: "subcategory 4", categoryId: "" },
      { id: "5", name: "subcategory 5", categoryId: "" },
    ],
  },
];

const store: StateCreator<CategoryState> = (set) => ({
  show: false,
  categoriesWithSub: [
    {
      id: "1",
      name: "Category 1",
      subCategories: [
        { id: "1", name: "subcategory 1", categoryId: "" },
        { id: "2", name: "subcategory 2", categoryId: "" },
        { id: "3", name: "subcategory 3", categoryId: "" },
        { id: "4", name: "subcategory 4", categoryId: "" },
      ],
    },
    {
      id: "2",
      name: "Category 2",
      subCategories: [
        { id: "1", name: "subcategory 1", categoryId: "" },
        { id: "2", name: "subcategory 2", categoryId: "" },
        { id: "3", name: "subcategory 3", categoryId: "" },
        { id: "4", name: "subcategory 4", categoryId: "" },
        { id: "5", name: "subcategory 5", categoryId: "" },
      ],
    },
    {
      id: "3",
      name: "Category 3",
      subCategories: [
        { id: "1", name: "subcategory 1", categoryId: "" },
        { id: "2", name: "subcategory 2", categoryId: "" },
        { id: "3", name: "subcategory 3", categoryId: "" },
        { id: "4", name: "subcategory 4", categoryId: "" },
        { id: "5", name: "subcategory 5", categoryId: "" },
        { id: "6", name: "subcategory 6", categoryId: "" },
      ],
    },
    {
      id: "4",
      name: "Category 4",
      subCategories: [
        { id: "1", name: "subcategory 1", categoryId: "" },
        { id: "2", name: "subcategory 2", categoryId: "" },
        { id: "3", name: "subcategory 3", categoryId: "" },
      ],
    },
    {
      id: "5",
      name: "Category 5",
      subCategories: [
        { id: "1", name: "subcategory 1", categoryId: "" },
        { id: "2", name: "subcategory 2", categoryId: "" },
        { id: "3", name: "subcategory 3", categoryId: "" },
        { id: "4", name: "subcategory 4", categoryId: "" },
        { id: "5", name: "subcategory 5", categoryId: "" },
        { id: "6", name: "subcategory 6", categoryId: "" },
        { id: "7", name: "subcategory 7", categoryId: "" },
      ],
    },
    {
      id: "6",
      name: "Category 6",
      subCategories: [
        { id: "1", name: "subcategory 1", categoryId: "" },
        { id: "2", name: "subcategory 2", categoryId: "" },
      ],
    },
    {
      id: "7",
      name: "Category 7",
      subCategories: [
        { id: "1", name: "subcategory 1", categoryId: "" },
        { id: "2", name: "subcategory 2", categoryId: "" },
        { id: "3", name: "subcategory 3", categoryId: "" },
      ],
    },
    {
      id: "8",
      name: "Category 8",
      subCategories: [
        { id: "1", name: "subcategory 1", categoryId: "" },
        { id: "2", name: "subcategory 2", categoryId: "" },
        { id: "3", name: "subcategory 3", categoryId: "" },
        { id: "4", name: "subcategory 4", categoryId: "" },
        { id: "5", name: "subcategory 5", categoryId: "" },
      ],
    },
  ],
  showCategories: () => set((state) => ({ ...state, show: !state.show })),
  setCategoriesWithSub: (items) => set((state) => ({ ...state, categoriesWithSub: items })),
});

const useCategoryStore = create(store);

export default useCategoryStore;
