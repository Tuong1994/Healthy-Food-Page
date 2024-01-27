import { Customer } from "../customer/type";

export type AuthInfo = Omit<Customer, "password" | "createdAt" | "updatedAt">;

export type Auth = {
  accessToken: string;
  expired: number;
  info: AuthInfo;
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

export type AuthPassword = {
  oldPassword: string;
  newPassword: string;
};
