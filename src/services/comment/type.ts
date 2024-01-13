import { ImageUpload } from "../image/type";

export type Comment = {
  id?: string;

  parentId: string;
  content: string;
  customerId: string;
  productId: string;
  productName: string;
  productImage: ImageUpload | null;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CommentFormData = Pick<Comment, "parentId" | "content" | "customerId" | "productId">;
