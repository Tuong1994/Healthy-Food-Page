import { getApiQuery } from "../helper";
import { ApiQuery, Paging } from "../type";
import { Shipment, ShipmentFormData } from "./type";
import Fetch from "..";
import shipmentApiPaths from "./path";

export const getShipments = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Shipment>>(shipmentApiPaths.getList + getApiQuery(query));
  return response;
};

export const getShipment = async (query: ApiQuery) => {
  const response = await Fetch.Get<Shipment>(shipmentApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createShipment = async (data: ShipmentFormData) => {
  const response = await Fetch.Post<ShipmentFormData, Shipment>(shipmentApiPaths.create, data);
  return response;
};

export const updateShipment = async (query: ApiQuery, data: ShipmentFormData) => {
  const response = await Fetch.Put<ShipmentFormData, any>(shipmentApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeShipments = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(shipmentApiPaths.remove + getApiQuery(query));
  return response;
};
