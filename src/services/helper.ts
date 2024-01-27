import { ELang } from "@/common/enum";
import { ApiQuery } from "./type";

export const getApiQuery = (query: ApiQuery) => {
  let {
    langCode = ELang.EN,
    page,
    limit,
    keywords,
    sortBy,
    ids,
    customerId,
    categoryId,
    subCategoryId,
    productId,
    cartId,
    orderId,
    shipmentId,
    commentId,
    rateId,
    likeId,
    imageId,
    cityId,
    cityCode,
    districtId,
    districtCode,
    wardId,
    wardCode,
    hasSub,
    role,
    gender,
    productStatus,
    inventoryStatus,
    origin,
    orderStatus,
    paymentMethod,
    paymentStatus,
  } = query;

  let rs = "?";

  page && page < 1 && (page = 1);
  limit && limit < 10 && (limit = 12);
  limit && limit > 100 && (limit = 12);

  langCode && (rs += `langCode=${langCode}`);
  page && (rs += `&page=${page}`);
  limit && (rs += `&limit=${limit}`);
  keywords && (rs += `&keywords=${keywords}`);
  sortBy && (rs += `&sortBy=${sortBy}`);

  ids && (rs += `&ids=${ids}`);
  customerId && (rs += `&customerId=${customerId}`);
  categoryId && (rs += `&categoryId=${categoryId}`);
  subCategoryId && (rs += `&subCategoryId=${subCategoryId}`);
  productId && (rs += `&productId=${productId}`);
  cartId && (rs += `&cartId=${cartId}`);
  orderId && (rs += `&orderId=${orderId}`);
  shipmentId && (rs += `&shipmentId=${shipmentId}`);
  commentId && (rs += `&commentId=${commentId}`);
  rateId && (rs += `&rateId=${rateId}`);
  likeId && (rs += `&likeId=${likeId}`);
  imageId && (rs += `&imageId=${imageId}`);
  cityId && (rs += `&cityId=${cityId}`);
  cityCode && (rs += `&cityCode=${cityCode}`);
  districtId && (rs += `&districtId=${districtId}`);
  districtCode && (rs += `&districtCode=${districtCode}`);
  wardId && (rs += `&wardId=${wardId}`);
  wardCode && (rs += `&wardCode=${wardCode}`);
  hasSub && (rs += `&hasSub=${hasSub}`);
  role && (rs += `&role=${role}`);
  gender && (rs += `&gender=${gender}`);
  productStatus && (rs += `&productStatus=${productStatus}`);
  inventoryStatus && (rs += `&inventoryStatus=${inventoryStatus}`);
  origin && (rs += `&origin=${origin}`);
  orderStatus && (rs += `&orderStatus=${orderStatus}`);
  paymentMethod && (rs += `&paymentMethod=${paymentMethod}`);
  paymentStatus && (rs += `&paymentStatus=${paymentStatus}`);

  return rs;
};
