import { User } from "../user/type";
import { Product } from "../product/type";

export type Like = {
  id?: string;
  productId: string;
  userId: string;
  product?: Pick<Product, "id" | "name" | "image" | "totalPrice" | "unit">;
  user?: Pick<User, "id" | "fullName" | "image">;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type LikeData = Pick<Like, "id" | "productId" | "userId">;
