import { FC } from "react";
import { Typography } from "@/components/UI";
import type { Product } from "@/services/product/type";
import type { Url } from "next/dist/shared/lib/router/router";
import type { Like as LikeType } from "@/services/like/type";
import { EProductUnit } from "@/services/product/enum";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import ProductCardImage from "./ProductCardImage";
import ProductCardLoading from "./ProductCardLoading";
import Quantity from "../Quantity";
import useQuantity from "../Quantity/useQuantity";
import Like from "../Like";
import Link from "next/link";
import utils from "@/utils";
import url from "@/common/constant/url";

const { PRODUCT_DETAIL } = url;

const { Paragraph } = Typography;

interface ProductCardProps {
  product: Product;
  like?: LikeType;
  rootClassName?: string;
  imgWidth?: number | string;
  imgHeight?: number | string;
  cardWidth?: number | string;
  responsive?: boolean;
  loading?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  like,
  rootClassName = "",
  imgWidth = "100%",
  imgHeight = "",
  cardWidth,
  loading,
  responsive = false,
}) => {
  const { locale, lang } = useLang();

  const { query } = useRouter();

  const defaultQuantity = useQuantity(product?.id as string);

  const responsiveClassName = responsive ? "product-card-responsive" : "";

  const imageResponsiveClassName = responsive ? "responsive-image" : "";

  const mainClassName = utils.formatClassName("product-card", responsiveClassName, rootClassName);

  const link: Url = { pathname: PRODUCT_DETAIL, query: { id: product?.id, langCode: query.langCode } };

  const cardSize = () => {
    if (!cardWidth) return "unset";
    if (typeof cardWidth === "string") return cardWidth;
    return `${cardWidth}px`;
  };

  const renderUnit = () => {
    const productUnits: Record<number, string> = {
      [EProductUnit.KG]: lang.options.productUnit.kg,
      [EProductUnit.BIN]: lang.options.productUnit.bin,
      [EProductUnit.BOTTLE]: lang.options.productUnit.bottle,
      [EProductUnit.BOX]: lang.options.productUnit.box,
      [EProductUnit.CAN]: lang.options.productUnit.can,
      [EProductUnit.PACK]: lang.options.productUnit.pack,
      [EProductUnit.PIECE]: lang.options.productUnit.piece,
    };
    return productUnits[product?.unit];
  };

  if (loading) return <ProductCardLoading responsive={responsive} cardSize={cardSize} />;

  return (
    <div style={{ minWidth: cardSize() }} className={mainClassName}>
      <ProductCardImage
        link={link}
        isNew={product?.isNew as boolean}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        imageResponsiveClassName={imageResponsiveClassName}
      />

      <div className="card-group responsive-content">
        <Link href={link} className="content-title">
          <Paragraph size={13}>{product?.name}</Paragraph>
        </Link>
        <Paragraph rootClassName="group-price" strong size={15}>
          {utils.formatPrice(locale, product?.totalPrice ?? 0)}/{renderUnit()}
        </Paragraph>
        <Quantity productId={product?.id as string} defaultValue={defaultQuantity} />
      </div>

      <Like product={product} like={like} />
    </div>
  );
};

export default ProductCard;
