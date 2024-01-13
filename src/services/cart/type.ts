import type { ImageUpload } from "../image/type";

export type CartItem = {
  id?: string;

  productId: string;
  productName: string;
  productPrice: string;
  productImage: ImageUpload;
  quantity: number;
  cartId: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type Cart = {
  id?: string;

  customerId: string;
  items: CartItem[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CartFormData = {
  customerId: string;
  items: Pick<CartItem, "productId" | "cartId" | "quantity">[];
};
