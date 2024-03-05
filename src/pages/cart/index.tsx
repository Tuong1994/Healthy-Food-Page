import { Fragment, useEffect, useState } from "react";
import { NextPage } from "next";
import { Breadcrumb } from "@/components/UI";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { Order } from "@/services/order/type";
import Link from "next/link";
import CartConfirm from "@/features/cart/components/CartConfirm";
import CartPayment from "@/features/cart/components/CartPayment";
import CartEmpty from "@/features/cart/components/CartEmpty";
import CartLoading from "@/features/cart/components/CartLoading";
import OrderModal from "@/features/cart/components/OrderModal";
import ProtectedRoute from "@/components/Page/ProtectedRoute";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import url from "@/common/constant/url";

const { HOME } = url;

export type Purchased = {
  open: boolean;
  data: Order;
};

interface CartProps {}

const Cart: NextPage<CartProps> = () => {
  const { locale, lang } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const cart = useCartStore((state) => state.cart);

  const { loading, error } = cart;

  const { pathname, replace: routerReplace } = useRouter();

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const [purchased, setPurchased] = useState<Purchased>({ open: false, data: {} as Order });

  const items: BreadcrumbItems = [
    {
      id: "1",
      label: <Link href={{ pathname: HOME, query: { langCode: locale } }}>{lang.common.menu.home}</Link>,
    },
    { id: "2", label: lang.common.menu.cart, actived: true },
  ];

  useEffect(() => {
    routerReplace({ pathname, query: { id: auth.info.id, page: 1, limit: 10, langCode: locale } });
  }, []);

  const handleConfirm = () => setIsConfirmed(true);

  const handleUnConfirm = () => setIsConfirmed(false);

  const handleClosePurchaseModal = () => setPurchased((prev) => ({ ...prev, open: false }));

  const renderContent = () => {
    if (loading) return <CartLoading />;
    if (error || !cart.data || cart.data?.totalItems === 0) return <CartEmpty locale={locale} lang={lang} />;
    return (
      <Fragment>
        {!isConfirmed ? (
          <CartConfirm loading={loading} cart={cart.data} handleConfirm={handleConfirm} />
        ) : (
          <CartPayment cart={cart.data} setPurchased={setPurchased} handleUnConfirm={handleUnConfirm} />
        )}
      </Fragment>
    );
  };

  return (
    <ProtectedRoute>
      <div className="page cart">
        <Breadcrumb items={items} />
        {renderContent()}
        <OrderModal
          lang={lang}
          locale={locale}
          open={purchased.open}
          order={purchased.data}
          onCancel={handleClosePurchaseModal}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Cart;
