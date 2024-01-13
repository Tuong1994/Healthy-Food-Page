export type ImageUpload = {
  id?: string;
  
  path: string;
  size: number;
  publicId: string;
  customerId: string | null;
  productId: string | null;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
