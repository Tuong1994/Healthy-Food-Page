import { SubCategory } from "../subcategory/type";
import { ImageUpload } from "../image/type";

export type Category = {
  id?: string;

  name: string;
  subCategories: SubCategory[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CategoryFormData = {
  nameEn: string;
  nameVn: string;
  image?: ImageUpload;
};
