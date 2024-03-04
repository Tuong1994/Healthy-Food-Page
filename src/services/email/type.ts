import { Order, OrderItem } from "../order/type";
import { Shipment } from "../shipment/type";

export type EmailContact = {
  fullName: string;
  email: string;
  phone: string;
};

export type EmailOrder = {
  email: string;
  order: Order,
  items: OrderItem[],
  shipment: Shipment | undefined
}