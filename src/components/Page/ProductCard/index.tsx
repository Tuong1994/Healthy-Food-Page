import React from "react";
import { UI } from "@/components";
import ProductCardImage from "./ProductCardImage";
import ProductCardControl from "./ProductCardControl";
import ProductCardLike from "./ProductCardLike";
import ProductCardLoading from "./ProductCardLoading";
import Link from "next/link";
import url from "@/common/constant/url";

const { PRODUCT_DETAIL } = url;

const { Card, Typography } = UI;

const { Paragraph } = Typography;

interface ProductCardProps {
  imgWidth?: number | string;
  imgHeight?: number | string;
  cardWidth?: number | string;
  responsive?: boolean;
  loading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imgWidth = "100%",
  imgHeight = "150px",
  cardWidth,
  loading,
  responsive = false,
}) => {
  const responsiveClassName = responsive ? "product-card-responsive" : "";

  const imageResponsiveClassName = responsive ? "body-image" : "";

  const cardSize = () => {
    if (!cardWidth) return "unset";
    if (typeof cardWidth === "string") return cardWidth;
    return `${cardWidth}px`;
  };

  if (loading) return <ProductCardLoading responsive={responsive} cardSize={cardSize} />;

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
