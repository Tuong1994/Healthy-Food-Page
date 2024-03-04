import { getApiQuery } from "../helper";
import { EmailContact, EmailOrder } from "./type";
import { ApiQuery } from "../type";
import emailApiPaths from "./path";
import Fetch from "..";

export const emailContact = async (query: ApiQuery, data: EmailContact) => {
  const response = await Fetch.Post<EmailContact, any>(emailApiPaths.contact + getApiQuery(query), data);
  return response;
};

export const emailOrder = async (query: ApiQuery, data: EmailOrder) => {
  const response = await Fetch.Post<EmailOrder, any>(emailApiPaths.order + getApiQuery(query), data);
  return response;
};
