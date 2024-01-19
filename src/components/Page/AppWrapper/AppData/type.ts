import { Cart } from "@/services/cart/type";
import { Category } from "@/services/category/type";

export type CommonProps = {
  loading: boolean;
  error: boolean;
};

export type CategoriesWithSubsResponse = {
  data: Category[];
} & CommonProps;

export type CartByCustomerResponse = {
  data: Cart | undefined;
} & CommonProps;
