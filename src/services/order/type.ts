import { EOrderStatus, EPaymentStatus, EPaymentMethod } from "./enum";
import type { ImageUpload } from "@/services/image/type";
import type { Shipment } from "@/services/shipment/type";

export type OrderItem = {
  id?: string;

  productId: string;
  productName: string;
  productPrice: number;
  productImage: ImageUpload | null;
  quantity: number;
  orderId: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type Order = {
  id?: string;

  orderNumber: string;
  status: EOrderStatus;
  paymentMethod: EPaymentMethod;
  paymentStatus: EPaymentStatus;
  customerId: string;
  items: OrderItem[];
  shipment?: Shipment;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type OrderFormData = Omit<Order, "id" | "items" | "createdAt" | "updatedAt"> & {
  items: Array<Pick<OrderItem, "productId" | "orderId" | "quantity">>;
};