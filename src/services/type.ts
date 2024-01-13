import { ELang, ESort } from "@/common/enum";
import { EGender, ERole } from "./customer/enum";
import { EInventoryStatus, EProductOrigin, EProductStatus } from "./product/enum";
import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "./order/enum";

export type Paging<T> = {
  totalItems: number;
  page: number;
  limit: number;
  items: T[];
};

export type List<T> = {
  totalItems: number;
  items: T[];
};

export type ApiQuery = {
  page?: number;
  limit?: number;
  keywords?: string;
  langCode?: ELang;
  sortBy?: ESort;

  ids?: string;
  customerId?: string;
  categoryId?: string;
  subCategoryId?: string;
  productId?: string;
  cartId?: string;
  orderId?: string;
  shipmentId?: string;
  commentId?: string;
  rateId?: string;
  likeId?: string;
  imageId?: string;
  cityId?: string;
  districtId?: string;
  wardId?: string;

  hasSub?: boolean;
  role?: ERole;
  gender?: EGender;
  productStatus?: EProductStatus;
  inventoryStatus?: EInventoryStatus;
  origin?: EProductOrigin;
  orderStatus?: EOrderStatus;
  paymentMethod?: EPaymentMethod;
  paymentStatus?: EPaymentStatus;
};

export type ResponseError = {
  status: number;
  message: string;
};

export type ResponseResult = {
  error?: ResponseError;
  success?: boolean;
};

export interface ApiResponse<T> extends ResponseResult {
  data: T;
}
