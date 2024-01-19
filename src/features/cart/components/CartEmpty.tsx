import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME } = url;

const { Button, Typography } = UI;

const { Paragraph } = Typography;

interface CartEmptyProps {
  lang: Lang;
}

const CartEmpty: React.FC<CartEmptyProps> = ({ lang }) => {
  return (
    <div className="cart-empty">
      <HiOutlineArchiveBox size={40} className="empty-icon" />
      <Paragraph size={16} italic variant="secondary">{lang.cart.empty.note}</Paragraph>
      <Link href={HOME}>
        <Button color="green" sizes="lg">
          {lang.cart.empty.action}
        </Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
