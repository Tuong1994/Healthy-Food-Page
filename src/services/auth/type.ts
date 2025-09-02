import { User } from "../user/type";

export type AuthInfo = Omit<User, "password" | "createdAt" | "updatedAt">;

export type Auth = {
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

export type AuthChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type AuthForgotPassword = {
  email: string;
};

export type AuthResetPassword = {
  resetPassword: string;
  confirmPassword?: string;
  token: string;
};
