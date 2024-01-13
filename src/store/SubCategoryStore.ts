import { SubCategory } from "@/services/subcategory/type";
import { create, StateCreator } from "zustand";

interface SubCategoryState {
  subcategories: SubCategory[];
}

const store: StateCreator<SubCategoryState> = () => ({
  subcategories: [
    { id: "1", name: "Subcategory 1", path: "/category/egg.png", categoryId: "" },
    { id: "2", name: "Subcategory 2", path: "/category/alcohol.png", categoryId: "" },
    { id: "3", name: "Subcategory 3", path: "/category/canned.png", categoryId: "" },
    { id: "4", name: "Subcategory 4", path: "/category/cheese.png", categoryId: "" },
    { id: "5", name: "Subcategory 5", path: "/category/coffee.png", categoryId: "" },
    { id: "6", name: "Subcategory 6", path: "/category/cream.png", categoryId: "" },
    { id: "7", name: "Subcategory 7", path: "/category/flour.png", categoryId: "" },
    { id: "8", name: "Subcategory 8", path: "/category/vegetable.png", categoryId: "" },
    { id: "9", name: "Subcategory 9", path: "/category/fruit.png", categoryId: "" },
    { id: "10", name: "Subcategory 10", path: "/category/honey.png", categoryId: "" },
    { id: "12", name: "Subcategory 12", path: "/category/juice.png", categoryId: "" },
    { id: "13", name: "Subcategory 13", path: "/category/meat.png", categoryId: "" },
    { id: "14", name: "Subcategory 14", path: "/category/mushroom.png", categoryId: "" },
    { id: "15", name: "Subcategory 15", path: "/category/noodles.png", categoryId: "" },
    { id: "16", name: "Subcategory 16", path: "/category/oil.png", categoryId: "" },
    { id: "17", name: "Subcategory 17", path: "/category/rice.png", categoryId: "" },
    { id: "18", name: "Subcategory 18", path: "/category/sauce.png", categoryId: "" },
    { id: "19", name: "Subcategory 19", path: "/category/sausage.png", categoryId: "" },
    { id: "20", name: "Subcategory 20", path: "/category/seafood.png", categoryId: "" },
    { id: "21", name: "Subcategory 21", path: "/category/seasoning.png", categoryId: "" },
    { id: "22", name: "Subcategory 22", path: "/category/syrup.png", categoryId: "" },
  ],
});

const useSubCategoryStore = create(store);

export default useSubCategoryStore;
