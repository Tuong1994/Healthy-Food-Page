import { getApiQuery } from "../helper";
import { ApiQuery } from "../type";
import { Auth, AuthSignIn, AuthSignUp } from "./type";
import Fetch from "..";
import authApiPaths from "./path";

export const signIn = async (data: AuthSignIn) => {
  const response = await Fetch.Post<AuthSignIn, Auth>(authApiPaths.signIn, data);
  return response;
};

export const signUp = async (data: AuthSignUp) => {
  const response = await Fetch.Post<AuthSignUp, any>(authApiPaths.signUp, data);
  return response;
};

export const refresh = async (query: ApiQuery) => {
  const response = await Fetch.Post<any, any>(authApiPaths.refresh + getApiQuery(query), null);
  return response;
};

export const logout = async (query: ApiQuery) => {
  const response = await Fetch.Post<any, any>(authApiPaths.logout + getApiQuery(query), null);
  return response;
};
