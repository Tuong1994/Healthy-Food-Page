import { EOrderStatus, EPaymentStatus, EPaymentMethod, ERecievedType } from "./enum";
import type { Shipment } from "@/services/shipment/type";
import type { Product } from "../product/type";

export type OrderItem = {
  id?: string;

  quantity: number;
  orderId: string;
  productId: string;
  product?: Pick<Product, "id" | "name" | "totalPrice" | "image">;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type Order = {
  id?: string;

  status: EOrderStatus;
  paymentStatus: EPaymentStatus;
  recievedType: ERecievedType; 
  paymentMethod: EPaymentMethod | number;
  customerId: string;
  note: string;
  shipmentFee: number;
  totalPayment: number;
  items: OrderItem[];
  orderNumber?: string;
  shipment?: Shipment;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type OrderFormData = Omit<Order, "id" | "items" | "createdAt" | "updatedAt"> & {
  items: Array<Pick<OrderItem, "productId" | "orderId" | "quantity">>;
};
