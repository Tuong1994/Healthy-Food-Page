import React from "react";
import { UI } from "@/components";
import { GridAppContext } from "@/components/UI/Grid/Context";
import Link from "next/link";
import ProductCardImage from "./ProductCardImage";
import ProductCardControl from "./ProductCardControl";
import ProductCardLike from "./ProductCardLike";
import url from "@/common/constant/url";

const { PRODUCT_DETAIL } = url;

const { Card, Typography } = UI;

const { Paragraph } = Typography;

interface ProductCardProps {
  imgWidth?: number | string;
  imgHeight?: number | string;
  cardWidth?: number | string;
  responsive?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imgWidth = "100%",
  imgHeight = "150px",
  cardWidth,
  responsive,
}) => {
  const { isPhone } = React.useContext(GridAppContext);

  const responsiveClassName = responsive ? "product-card-responsive" : "";

  const imageResponsiveClassName = responsive ? "body-image" : "";

  const cardSize = () => {
    if (!cardWidth) return "unset";
    if (typeof cardWidth === "string") return cardWidth;
    return `${cardWidth}px`;
  };

  return (
    <Card
      style={{ minWidth: cardSize() }}
      rootClassName={`product-card ${responsiveClassName}`}
      bodyClassName="responsive-body"
    >
      <ProductCardImage
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        imageResponsiveClassName={imageResponsiveClassName}
      />

      <div className="body-content">
        <Link href={`${PRODUCT_DETAIL}/1`}>Product name</Link>
        <Paragraph rootClassName="product-card-price" strong size={16}>
          $100,000/kg
        </Paragraph>
        <ProductCardControl />
      </div>

      <ProductCardLike />
    </Card>
  );
};

export default ProductCard;
