import { getApiQuery } from "../helper";
import { ApiQuery } from "../type";
import { Auth, AuthInfo, AuthPassword, AuthSignIn, AuthSignUp } from "./type";
import localStorageKey from "@/common/constant/storage";
import authApiPaths from "./path";
import Fetch from "..";

export const signIn = async (data: AuthSignIn) => {
  const response = await Fetch.Post<AuthSignIn, Auth>(authApiPaths.signIn, data);
  if (response.success) localStorage.setItem(localStorageKey.AUTH, JSON.stringify(response.data));
  return response;
};

export const signUp = async (data: AuthSignUp) => {
  const response = await Fetch.Post<AuthSignUp, AuthInfo>(authApiPaths.signUp, data);
  return response;
};

export const refresh = async (query: ApiQuery) => {
  const response = await Fetch.Post<any, any>(authApiPaths.refresh + getApiQuery(query), null);
  if (response.success) {
    if (localStorage.getItem(localStorageKey.AUTH)) {
      const oldAuth = JSON.parse(localStorage.getItem(localStorageKey.AUTH) ?? "") as Auth;
      const newAuth = { ...oldAuth, ...response.data };
      localStorage.setItem(localStorageKey.AUTH, JSON.stringify(newAuth));
    }
  }
  return response;
};

export const changePassword = async (query: ApiQuery, data: AuthPassword) => {
  const response = await Fetch.Post<AuthPassword, any>(
    authApiPaths.changePassword + getApiQuery(query),
    data
  );
  return response;
};

export const logout = async (query: ApiQuery) => {
  const response = await Fetch.Post<any, any>(authApiPaths.logout + getApiQuery(query), null);
  if (response.success) localStorage.removeItem(localStorageKey.AUTH);
  return response;
};
