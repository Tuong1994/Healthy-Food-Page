const url = {
  HOME: `/`,
  ABOUT: "/about",
  CART: "/cart",
  FAVORITE: "/favorite",
  PRODUCT_LIST: "/product/list",
  PRODUCT_DETAIL: "/product/detail",
  AUTH_SIGN_IN: "/auth/signIn",
  AUTH_SIGN_UP: "/auth/signUp",
  AUTH_FORGOT_PASSWORD: "/auth/forgotPassword",
  AUTH_RESET_PASSWORD: "/auth/resetPassword",
  CONTACT: "/contact",
  PAYMENT: "/payment",
  DELIVERY: "/delivery",
  EXCHANGE: "/exchange",
  USER: "/user",
  SEARCH: "/search",
};

export const ADMIN_PATH =
  process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://healthy-food-admin.vercel.app";

export default url;
