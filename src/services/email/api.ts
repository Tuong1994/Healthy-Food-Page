import { getApiQuery } from "../helper";
import { EmailContact } from "./type";
import { ApiQuery } from "../type";
import Fetch from "..";
import emailApiPaths from "./path";

export const emailContact = async (query: ApiQuery, data: EmailContact) => {
  const response = await Fetch.Post<EmailContact, any>(emailApiPaths.contact + getApiQuery(query), data);
  return response;
};
