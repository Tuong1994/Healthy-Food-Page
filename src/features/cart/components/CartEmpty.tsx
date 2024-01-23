import { FC } from "react";
import { Button, Typography } from "@/components/UI";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { ELang } from "@/common/enum";
import type { Lang } from "@/common/type";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME } = url;

const { Paragraph } = Typography;

interface CartEmptyProps {
  locale: ELang;
  lang: Lang;
}

const CartEmpty: FC<CartEmptyProps> = ({ locale, lang }) => {
  return (
    <div className="cart-empty">
      <HiOutlineArchiveBox size={35} className="empty-icon" />
      <Paragraph italic variant="secondary">
        {lang.cart.empty.note}
      </Paragraph>
      <Link href={{ pathname: HOME, query: { langCode: locale } }}>
        <Button color="green" sizes="lg">
          {lang.cart.empty.action}
        </Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
