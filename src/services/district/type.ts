export type District = {
  id?: string;
  name: string;
  code: number;
  cityCode: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type DistrictFormData = {
  nameEn: string;
  nameVn: string;
} & Pick<District, "code" | "cityCode">;
