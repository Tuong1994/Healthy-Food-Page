import { FC, Fragment, useState, useRef } from "react";
import { Avatar, Button, Space, Image, Empty, Typography } from "@/components/UI";
import { useClickOutside, useLang, useRender } from "@/hooks";
import { CgShoppingCart } from "react-icons/cg";
import { useRouter } from "next/router";
import type { Lang } from "@/common/type";
import Link from "next/link";
import useSumQuantity from "@/features/cart/hooks/useSumQuanity";
import useSumPrice from "@/features/cart/hooks/useSumPrice";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import url from "@/common/constant/url";
import utils from "@/utils";

const { CART, AUTH_SIGN_IN, PRODUCT_DETAIL } = url;

const { Paragraph } = Typography;

interface HeaderCartProps {
  lang: Lang;
}

const HeaderCart: FC<HeaderCartProps> = ({ lang }) => {
  const { locale } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const cart = useCartStore((state) => state.quickCart);

  const router = useRouter();

  const totalQuantity = useSumQuantity({ type: "cart" });

  const totalPrice = useSumPrice({ type: "cart" });

  const [open, setOpen] = useState<boolean>(false);

  const cartRef = useRef<HTMLDivElement>(null);

  const render = useRender(open);

  useClickOutside(cartRef, setOpen);

  const dropdownClassName = open ? "cart-dropdown-active" : "";

  const handleOpen = () => {
    if (!auth.isAuth) return router.push(AUTH_SIGN_IN);
    setOpen(!open);
  };

  const renderContent = () => {
    if (!cart.data || !cart.data.detail) return <Empty text={lang.pageComponent.header.cart.note} />;
    const { detail: cartDetail } = cart.data;
    if (cartDetail?.items && !cartDetail?.items.length)
      return <Empty text={lang.pageComponent.header.cart.note} />;

    return (
      <Fragment>
        <div className="dropdown-inner">
          {cartDetail?.items.map((item) => (
            <Link
              key={item.id}
              className="inner-item"
              href={{
                pathname: PRODUCT_DETAIL,
                query: { id: item.productId, langCode: locale },
              }}
              onClick={handleOpen}
            >
              <Space>
                <Image src={item.product?.image?.path} imgWidth={60} imgHeight={60} alt="product" />
                <div>
                  <Paragraph rootClassName="item-name">{item.product?.name}</Paragraph>
                  <Space size={65}>
                    <Paragraph size={16} strong>
                      {utils.formatPrice(locale, item.product?.totalPrice as number)}
                    </Paragraph>
                    <span>
                      {lang.common.unit.quanity}. {item.quantity}
                    </span>
                  </Space>
                </div>
              </Space>
            </Link>
          ))}
        </div>
        <div className="dropdown-action">
          <span className="action-text">{utils.formatPrice(locale, totalPrice)}</span>
          <Link
            href={{
              pathname: CART,
              query: { id: cartDetail?.userId, page: 1, limit: 10, langCode: locale },
            }}
            onClick={handleOpen}
          >
            <Button sizes="sm" color="green">
              {lang.pageComponent.header.cart.action}
            </Button>
          </Link>
        </div>
      </Fragment>
    );
  };

  return (
    <div ref={cartRef} className="bottom-cart">
      <Avatar badge={String(totalQuantity)} rootClassName="cart-icon" onClick={handleOpen}>
        <CgShoppingCart size={25} />
      </Avatar>

      {render && <div className={`cart-dropdown ${dropdownClassName}`}>{renderContent()}</div>}
    </div>
  );
};

export default HeaderCart;
