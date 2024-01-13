import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { useClickOutside, useRender } from "@/hooks";
import { CgShoppingCart } from "react-icons/cg";
import Link from "next/link";
import url from "@/common/constant/url";

const { CART, PRODUCT_DETAIL } = url;

const { Avatar, Button, Space, Image, Typography } = UI;

const { Paragraph } = Typography;

interface HeaderCartProps {
  lang: Lang;
}

const HeaderCart: React.FC<HeaderCartProps> = ({ lang }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const cartRef = React.useRef<HTMLDivElement>(null);

  const render = useRender(open);

  useClickOutside(cartRef, setOpen);

  const dropdownClassName = open ? "cart-dropdown-active" : "";

  const handleOpen = () => setOpen(!open);

  const renderItems = () => {
    return [...Array(5)].map((_, idx) => (
      <Link href={`${PRODUCT_DETAIL}/1`} className="inner-item" key={idx}>
        <Space>
          <Image imgWidth={60} imgHeight={60} src="/default-image.jpg" alt="product" />
          <div>
            <Paragraph rootClassName="item-name">Product name</Paragraph>
            <Space size={80}>
              <Paragraph size={16} strong>
                $150.000
              </Paragraph>
              <span>{lang.common.unit.quanity}. 5</span>
            </Space>
          </div>
        </Space>
      </Link>
    ));
  };
  return (
    <div ref={cartRef} className="bottom-cart">
      <Avatar badge="0" rootClassName="cart-icon" onClick={handleOpen}>
        <CgShoppingCart size={25} />
      </Avatar>

      {render && (
        <div className={`cart-dropdown ${dropdownClassName}`}>
          <div className="dropdown-inner">{renderItems()}</div>
          <div className="dropdown-action">
            <span className="action-text">$14.000.000</span>
            <Link href={CART}>
              <Button sizes="sm" color="green">
                {lang.pageComponent.header.cart}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderCart;
