import globalApiPaths from "./path";
import Fetch from "..";

export const connection = async () => {
  const response = await Fetch.Get<any>(globalApiPaths.connection);
  return response;
};
