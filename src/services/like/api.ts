import { ApiQuery, List, Paging } from "../type";
import { Like, LikeData } from "./type";
import { getApiQuery } from "../helper";
import likeApiPaths from "./path";
import Fetch from "..";

export const getLikes = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<Like>>(likeApiPaths.getList + getApiQuery(query));
  return response;
};

export const getLikesPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Like>>(likeApiPaths.getListPaging + getApiQuery(query));
  return response;
};

export const getLike = async (query: ApiQuery) => {
  const response = await Fetch.Get<Like>(likeApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createLike = async (data: LikeData) => {
  const response = await Fetch.Post<LikeData, Like>(likeApiPaths.create, data);
  return response;
};

export const updateLike = async (query: ApiQuery, data: LikeData) => {
  const response = await Fetch.Put<LikeData, any>(likeApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeLikes = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(likeApiPaths.remove + getApiQuery(query));
  return response;
};
