import type { Customer } from "../customer/type";
import type { Product } from "../product/type";

export type Comment = {
  id?: string;

  content: string;
  parentId: string | null;
  customerId: string;
  productId: string;
  product?: Pick<Product, "id" | "name" | "image">;
  customer?: Pick<Customer, "fullName" | "image">;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CommentFormData = Pick<Comment, "id" | "parentId" | "content" | "customerId" | "productId">;
