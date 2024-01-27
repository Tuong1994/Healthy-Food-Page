export type City = {
  id?: string;
  name: string;
  code: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CityFormData = {
  nameEn: string;
  nameVn: string;
} & Pick<City, "code">;
