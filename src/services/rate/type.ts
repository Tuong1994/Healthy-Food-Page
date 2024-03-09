import type { User } from "../user/type";
import type { Product } from "../product/type";

export type Rate = {
  id?: string;

  point: number;
  note: string;
  userId: string;
  productId: string;
  product?: Pick<Product, "id" | "name" | "image">;
  user?: Pick<User, "fullName" | "image">;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type RateFormData = Pick<Rate, "point" | "note" | "userId" | "productId">;
