import { Comment } from "../comment/type";
import { ImageUpload } from "../image/type";
import { Rate } from "../rate/type";
import { EInventoryStatus, EProductStatus, EProductUnit } from "./enum";

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
  supplier: string;
  origin: string;
  categoryId: string;
  subCategoryId: string;

  image?: ImageUpload[];
  comments?: Comment[];
  rates?: Rate[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type ProductFormData = {
  nameEn: string;
  nameVn: string;
} & Omit<Product, "id" | "name" | "comments" | "rates" | "createdAt" | "updatedAt">;
