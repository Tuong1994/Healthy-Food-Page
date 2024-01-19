import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { useClickOutside, useLang, useRender } from "@/hooks";
import { CgShoppingCart } from "react-icons/cg";
import { useRouter } from "next/router";
import useSumQuantity from "@/features/cart/hooks/useSumQuanity";
import useSumPrice from "@/features/cart/hooks/useSumPrice";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import Link from "next/link";
import utils from "@/utils";
import url from "@/common/constant/url";

const { CART, AUTH_SIGN_IN, PRODUCT_DETAIL } = url;

const { Avatar, Button, Space, Image, Empty, Typography } = UI;

const { Paragraph } = Typography;

interface HeaderCartProps {
  lang: Lang;
}

const HeaderCart: React.FC<HeaderCartProps> = ({ lang }) => {
  const { locale } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const cart = useCartStore((state) => state.cart);

  const router = useRouter();

  const totalQuantity = useSumQuantity("cart");

  const totalPrice = useSumPrice("cart");

  const [open, setOpen] = React.useState<boolean>(false);

  const cartRef = React.useRef<HTMLDivElement>(null);

  const render = useRender(open);

  useClickOutside(cartRef, setOpen);

  const dropdownClassName = open ? "cart-dropdown-active" : "";

  const handleOpen = () => {
    // if (!auth.isAuth) return router.push(AUTH_SIGN_IN);
    setOpen(!open);
  };

  const renderContent = () => {
    if (!cart) return <Empty text={lang.pageComponent.header.cart.note} />;
    if (cart.items && !cart.items.length) return <Empty text={lang.pageComponent.header.cart.note} />;

    return (
      <React.Fragment>
        <div className="dropdown-inner">
          {cart.items.map((item) => (
            <Link href={`${PRODUCT_DETAIL}/1`} className="inner-item" key={item.id}>
              <Space>
                <Image imgWidth={60} imgHeight={60} src="/default-image.jpg" alt="product" />
                <div>
                  <Paragraph rootClassName="item-name">{item.product?.name}</Paragraph>
                  <Space size={80}>
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
          <Link href={CART}>
            <Button sizes="sm" color="green">
              {lang.pageComponent.header.cart.action}
            </Button>
          </Link>
        </div>
      </React.Fragment>
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
