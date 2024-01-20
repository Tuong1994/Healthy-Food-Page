import { FC } from "react";
import { Button, Typography } from "@/components/UI";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import type { Lang } from "@/common/type";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME } = url;

const { Paragraph } = Typography;

interface CartEmptyProps {
  lang: Lang;
}

const CartEmpty: FC<CartEmptyProps> = ({ lang }) => {
  return (
    <div className="cart-empty">
      <HiOutlineArchiveBox size={40} className="empty-icon" />
      <Paragraph size={16} italic variant="secondary">
        {lang.cart.empty.note}
      </Paragraph>
      <Link href={HOME}>
        <Button color="green" sizes="lg">
          {lang.cart.empty.action}
        </Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
