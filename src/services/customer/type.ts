import { Cart } from "../cart/type";
import { Comment } from "../comment/type";
import { ImageUpload } from "../image/type";
import { Order } from "../order/type";
import { Rate } from "../rate/type";
import { EGender, ERole } from "./enum";

export type Customer = {
  id?: string;

  email: string;
  password?: string;
  phone: string;
  role: ERole;

  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: EGender;
  birthday?: Date | string;
  address_en?: string;
  address_vn?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;
  fullAddress?: string;
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
  "id" | "fullName" | "fullAddress" | "cart" | "orders" | "comments" | "rates" | "createdAt" | "updatedAt"
>;
