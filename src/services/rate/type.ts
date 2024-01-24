import type { Customer } from "../customer/type";
import type { Product } from "../product/type";

export type Rate = {
  id?: string;

  point: number;
  note: string;
  customerId: string;
  productId: string;
  product?: Pick<Product, "id" | "name" | "image">;
  customer?: Pick<Customer, "fullName" | "image">;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type RateFormData = Pick<Rate, "point" | "note" | "customerId" | "productId">;
