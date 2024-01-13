import about_en from "./about";
import auth_en from "./auth";
import cart_en from "./cart";
import common_en from "./common";
import customer_en from "./customer";
import delivery_en from "./delivery";
import exchange_en from "./exchange";
import favorite_en from "./favorite";
import home_en from "./home";
import options_en from "./options";
import page_components_en from "./page-components";
import payment_en from "./payment";
import product_en from "./product";
import search_en from "./search";

const en = {
  common: common_en,
  options: options_en,
  pageComponent: page_components_en,
  auth: auth_en,
  home: home_en,
  about: about_en,
  product: product_en,
  cart: cart_en,
  payment: payment_en,
  delivery: delivery_en,
  exchange: exchange_en,
  customer: customer_en,
  search: search_en,
  favorite: favorite_en
};

export type EN = typeof en;

export default en;
