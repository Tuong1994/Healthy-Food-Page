"use client";

import React from "react";
import { HiShoppingBag, HiShoppingCart, HiHeart, HiUser } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useLang, useNotDisplay } from "@/hooks";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME, CART, FAVORITE, CUSTOMER, AUTH_SIGN_IN } = url;

const ICON_SIZE = 22;

const isAuth = true;

interface FooterMobileProps {}

const FooterMobile: React.FC<FooterMobileProps> = () => {
  const { lang } = useLang();

  const pathname = usePathname();

  const notDisplay = useNotDisplay();

  const items = React.useMemo(
    () => [
      { id: "1", label: lang.common.menu.mart, icon: <HiShoppingBag size={ICON_SIZE} />, path: HOME },
      { id: "2", label: lang.common.menu.cart, icon: <HiShoppingCart size={ICON_SIZE} />, path: CART },
      { id: "3", label: lang.common.menu.favorite, icon: <HiHeart size={ICON_SIZE} />, path: FAVORITE },
      {
        id: "4",
        label: lang.common.menu.account,
        icon: <HiUser size={ICON_SIZE} />,
        path: isAuth ? CUSTOMER : AUTH_SIGN_IN,
      },
    ],
    [lang]
  );

  const renderItems = () => {
    const itemWidth = `calc(100% / ${items.length})`;
    return items.map((item) => {
      const activeClassName = item.path === pathname ? "mobile-item-active" : "";
      return (
        <Link
          href={item.path}
          key={item.id}
          style={{ width: itemWidth }}
          className={`mobile-item ${activeClassName}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      );
    });
  };

  if (notDisplay) return <React.Fragment></React.Fragment>;

  return <div className="footer-mobile">{renderItems()}</div>;
};

export default FooterMobile;
