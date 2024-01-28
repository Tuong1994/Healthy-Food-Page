import { Customer } from "../customer/type";
import { Product } from "../product/type";

export type Like = {
  id?: string;
  productId: string;
  customerId: string;
  product?: Pick<Product, "id" | "name" | "image" | "totalPrice" | "unit">;
  customer?: Pick<Customer, "id" | "fullName" | "image">;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type LikeData = Pick<Like, "id" | "productId" | "customerId">;
