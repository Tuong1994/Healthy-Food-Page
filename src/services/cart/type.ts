import { Product } from "../product/type";

export type CartItem = {
  id?: string;

  quantity: number;
  productId: string;
  cartId: string;
  product?: Pick<Product, "id" | "name" | "totalPrice" | "image">;

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

export type CartWithItemsPaging = {
  totalItems: number;
  detail: Cart;
};

export type CartFormData = {
  customerId: string;
  items: Pick<CartItem, "productId" | "cartId" | "quantity">[];
};
