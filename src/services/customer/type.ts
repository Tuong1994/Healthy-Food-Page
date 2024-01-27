import { Cart } from "../cart/type";
import { Comment } from "../comment/type";
import { ImageUpload } from "../image/type";
import { Order } from "../order/type";
import { Rate } from "../rate/type";
import { EGender, ERole } from "./enum";

export type CustomerAddress = {
  id?: string;
  address?: string;
  addressEn?: string;
  addressVn?: string;
  fullAddress?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type Customer = {
  id?: string;

  email: string;
  password?: string;
  phone: string;
  role: ERole | null;

  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: EGender | null;
  birthday?: Date | string;

  address?: CustomerAddress;
  image?: ImageUpload;
  cart?: Cart;
  orders?: Order[];
  comments?: Comment[];
  rates?: Rate[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CustomerFormData = Omit<
  Customer,
  "id" | "fullName" | "cart" | "orders" | "comments" | "rates" | "createdAt" | "updatedAt"
>;