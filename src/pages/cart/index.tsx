import React from "react";
import { NextPage } from "next";
import { UI } from "@/components";
import { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { useLang } from "@/hooks";
import Link from "next/link";
import CartConfirm from "@/features/cart/CartConfirm";
import CartPayment from "@/features/cart/CartPayment";
import CartEmpty from "@/features/cart/CartEmpty";
import url from "@/common/constant/url";

const { HOME } = url;

const { Breadcrumb } = UI;

const isEmpty = false;

const Cart: NextPage = () => {
  const { lang } = useLang();

  const [isConfirmed, setIsConfirmed] = React.useState<boolean>(false);

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
        <React.Fragment>
          {!isConfirmed ? (
            <CartConfirm handleConfirm={handleConfirm} />
          ) : (
            <CartPayment handleUnConfirm={handleUnConfirm} />
          )}
        </React.Fragment>
      ) : (
        <CartEmpty lang={lang} />
      )}
    </div>
  );
};

export default Cart;
