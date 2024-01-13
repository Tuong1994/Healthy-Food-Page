import auth_vn from "./auth";
import common_vn from "./common";
import page_components_vn from "./page-components";
import home_vn from "./home";
import about_vn from "./about";
import product_vn from "./product";
import cart_vn from "./cart";
import payment_vn from "./payment";
import delivery_vn from "./delivery";
import exchange_vn from "./exchange";
import customer_vn from "./customer";
import options_vn from "./options";
import search_vn from "./search";
import favorite_vn from "./favorite";

const vn = {
  common: common_vn,
  options: options_vn,
  pageComponent: page_components_vn,
  auth: auth_vn,
  home: home_vn,
  about: about_vn,
  product: product_vn,
  cart: cart_vn,
  payment: payment_vn,
  delivery: delivery_vn,
  exchange: exchange_vn,
  customer: customer_vn,
  search: search_vn,
  favorite: favorite_vn,
};

export type VN = typeof vn;

export default vn;
