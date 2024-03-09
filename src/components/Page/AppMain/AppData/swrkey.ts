export const categorySwrKey = (locale: any) => `getCategoriesWithSubs?locale=${locale}`;

export const cartSwrKey = (id: any, page: any, limit: any, locale: any) =>
  `getCartByUser?userId=${id}&page=${page}&limit=${limit}&langCode=${locale}`;
