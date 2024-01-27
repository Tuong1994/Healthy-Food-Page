export type ImageUpload = {
  id?: string;

  path: string;
  size: number;
  publicId: string;
  customerId: string | null;
  productId: string | null;
  categoryId: string | null;
  subCategoryId: string | null;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
