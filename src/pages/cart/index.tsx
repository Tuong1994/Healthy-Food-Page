import { Fragment, useEffect, useState } from "react";
import { NextPage } from "next";
import { Breadcrumb } from "@/components/UI";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import Link from "next/link";
import CartConfirm from "@/features/cart/components/CartConfirm";
import CartPayment from "@/features/cart/components/CartPayment";
import CartEmpty from "@/features/cart/components/CartEmpty";
import url from "@/common/constant/url";
import useAuthStore from "@/store/AuthStore";

const { HOME } = url;

const isEmpty = false;

interface CartProps {}

const Cart: NextPage<CartProps> = () => {
  const { locale, lang } = useLang();

  const { pathname, replace: routerReplace } = useRouter();

  const auth = useAuthStore((state) => state.auth);

  useEffect(() => {
    routerReplace({ pathname, query: { id: auth.info.id, page: 1, limit: 10, langCode: locale } });
  }, []);

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const items: BreadcrumbItems = [
    { id: "1", label: <Link href={HOME}>{lang.common.menu.home}</Link> },
    { id: "2", label: lang.common.menu.cart, actived: true },
  ];

  const handleConfirm = () => setIsConfirmed(true);

  const handleUnConfirm = () => setIsConfirmed(false);

  return (
    <div className="page cart">
      <Breadcrumb items={items} />

      {!isEmpty ? (
        <Fragment>
          {!isConfirmed ? (
            <CartConfirm handleConfirm={handleConfirm} />
          ) : (
            <CartPayment handleUnConfirm={handleUnConfirm} />
          )}
        </Fragment>
      ) : (
        <CartEmpty lang={lang} />
      )}
    </div>
  );
};

export default Cart;
