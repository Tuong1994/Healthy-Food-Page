import { FC, useMemo } from "react";
import { HiShoppingBag, HiShoppingCart, HiHeart, HiUser } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useLang, useMounted, useNotDisplay } from "@/hooks";
import Link from "next/link";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";
import utils from "@/utils";

const { HOME, CART, FAVORITE, CUSTOMER, AUTH_SIGN_IN } = url;

const ICON_SIZE = 22;

interface FooterMobileProps {}

const FooterMobile: FC<FooterMobileProps> = () => {
  const { locale, lang } = useLang();

  const isMounted = useMounted();

  const auth = useAuthStore((state) => state.auth);

  const { isAuth, info } = auth;

  const pathname = usePathname();

  const notDisplay = useNotDisplay();

  const items = useMemo(
    () => [
      {
        id: "1",
        label: lang.common.menu.mart,
        icon: <HiShoppingBag size={ICON_SIZE} />,
        path: HOME,
        query: { langCode: locale },
      },
      {
        id: "2",
        label: lang.common.menu.cart,
        icon: <HiShoppingCart size={ICON_SIZE} />,
        path: isAuth ? CART : AUTH_SIGN_IN,
        query: isAuth ? { page: 1, limit: 10, id: info.id, langCode: locale } : { langCode: locale },
      },
      {
        id: "3",
        label: lang.common.menu.favorite,
        icon: <HiHeart size={ICON_SIZE} />,
        path: isAuth ? FAVORITE : AUTH_SIGN_IN,
        query: isAuth ? { page: 1, limit: 10, id: info.id, langCode: locale } : { langCode: locale },
      },
      {
        id: "4",
        label: lang.common.menu.account,
        icon: <HiUser size={ICON_SIZE} />,
        path: isAuth ? CUSTOMER : AUTH_SIGN_IN,
        query: isAuth ? { id: info.id, langCode: locale } : { langCode: locale },
      },
    ],
    [lang]
  );

  const renderItems = () => {
    const itemWidth = `calc(100% / ${items.length})`;
    return items.map((item) => {
      const activeClassName = item.path === pathname ? "mobile-item-active" : "";
      const itemClassName = utils.formatClassName("mobile-item", activeClassName);
      return (
        <Link
          key={item.id}
          href={{ pathname: item.path, query: item.query }}
          style={{ width: itemWidth }}
          className={itemClassName}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      );
    });
  };

  if (!isMounted) return null;

  if (notDisplay) return null;

  return <div className="footer-mobile">{renderItems()}</div>;
};

export default FooterMobile;
