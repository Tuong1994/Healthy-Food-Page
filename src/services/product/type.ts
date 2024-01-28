import { Category } from "../category/type";
import { Comment } from "../comment/type";
import { ImageUpload } from "../image/type";
import { Like } from "../like/type";
import { Rate } from "../rate/type";
import { SubCategory } from "../subcategory/type";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "./enum";

export type Product = {
  id?: string;

  name: string;
  costPrice: number;
  profit: number;
  totalPrice: number;
  inventory: number;
  unit: EProductUnit;
  status: EProductStatus;
  inventoryStatus: EInventoryStatus;
  origin: EProductOrigin;
  supplier: string;
  categoryId: string;
  subCategoryId: string;
  isNew?: boolean;
  point?: number;
  totalVoted?: number;

  category?: Category;
  subCategory?: SubCategory;
  image?: ImageUpload[];
  comments?: Comment[];
  rates?: Rate[];
  likes?: Like[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type ProductFormData = {
  nameEn: string;
  nameVn: string;
} & Omit<Product, "id" | "isNew" | "point" | "name" | "comments" | "rates" | "createdAt" | "updatedAt">;
