import React from "react";
import { UI } from "@/components";
import { Product } from "@/services/product/type";
import Link from "next/link";
import url from "@/common/constant/url";
import { Url } from "next/dist/shared/lib/router/router";

const { PRODUCT_DETAIL } = url;

const { Image, Badge } = UI;

interface ProductCardImageProps {
  link: Url;
  isNew: boolean;
  imgWidth: number | string;
  imgHeight: number | string;
  imageResponsiveClassName?: string;
}

const ProductCardImage: React.FC<ProductCardImageProps> = ({
  link,
  isNew,
  imgWidth,
  imgHeight,
  imageResponsiveClassName = "",
}) => {
  return (
    <div className="product-card-image">
      <Link href={link}>
        <Image
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          rootClassName={imageResponsiveClassName}
          alt="product"
        />
      </Link>
      {isNew && (
        <Badge shape="square" color="blue" rootClassName="image-badge">
          New
        </Badge>
      )}
    </div>
  );
};

export default ProductCardImage;
