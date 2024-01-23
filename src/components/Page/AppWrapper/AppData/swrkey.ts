export const categorySwrKey = (locale: any) => `getCategoriesWithSubs?locale=${locale}`;

export const cartSwrKey = (id: any, page: any, limit: any, locale: any) =>
  `getCartByCustomer?customerId=${id}&page=${page}&limit=${limit}&langCode=${locale}`;
