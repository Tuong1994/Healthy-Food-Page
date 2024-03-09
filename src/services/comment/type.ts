import type { User } from "../user/type";
import type { Product } from "../product/type";

export type Comment = {
  id?: string;

  content: string;
  parentId: string | null;
  userId: string;
  productId: string;
  product?: Pick<Product, "id" | "name" | "image">;
  user?: Pick<User, "fullName" | "image">;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CommentFormData = Pick<Comment, "id" | "parentId" | "content" | "userId" | "productId">;
