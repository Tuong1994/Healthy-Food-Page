export type Ward = {
  id?: string;
  name: string;
  code: number;
  districtCode: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type WardFormData = {
  nameEn: string;
  nameVn: string;
} & Pick<Ward, "code" | "districtCode">;
