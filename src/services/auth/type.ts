import { Customer } from "../customer/type";

export type Auth = {
  accessToken: string;
  expired: number;
  info: Omit<Customer, "password" | "createdAt" | "updatedAt">;
  isAuth: boolean;
};

export type AuthSignIn = {
  email: string;
  password: string;
};

export type AuthSignUp = {
  email: string;
  password: string;
  phone: string;
};
