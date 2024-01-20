import { Fragment, useState } from "react";
import { NextPage } from "next";
import { Breadcrumb } from "@/components/UI";
import { useLang } from "@/hooks";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import Link from "next/link";
import CartConfirm from "@/features/cart/components/CartConfirm";
import CartPayment from "@/features/cart/components/CartPayment";
import CartEmpty from "@/features/cart/components/CartEmpty";
import useCartStore from "@/store/CartStore";
import url from "@/common/constant/url";

const { HOME } = url;

const isEmpty = false;

const Cart: NextPage = () => {
  const { lang } = useLang();

  const cart = useCartStore((state) => state.cart);

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
