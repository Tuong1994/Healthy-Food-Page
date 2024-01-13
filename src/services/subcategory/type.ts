import { ImageUpload } from "../image/type";

export type SubCategory = {
  id?: string;

  name: string;
  categoryId: string;
  path?: string;
  image?: ImageUpload;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type SubCategoryFormData = {
  nameEn: string;
  nameVn: string;
  categoryId: string;
  image?: ImageUpload;
};
