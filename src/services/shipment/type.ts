export type Shipment = {
  id?: string;

  fullName: string;
  phone: string;
  email: string;
  address: string;
  shipmentNumber?: string;
  orderId?: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type ShipmentFormData = Omit<Shipment, "id" | "createdAt" | "updatedAt">;
