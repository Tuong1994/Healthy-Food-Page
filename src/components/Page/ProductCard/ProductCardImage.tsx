import React from "react";
import { UI } from "@/components";
import Link from "next/link";
import url from "@/common/constant/url";

const { PRODUCT_DETAIL } = url;

const { Image, Badge } = UI;

interface ProductCardImageProps {
  imgWidth: number | string;
  imgHeight: number | string;
  imageResponsiveClassName?: string;
}

const ProductCardImage: React.FC<ProductCardImageProps> = ({
  imgWidth,
  imgHeight,
  imageResponsiveClassName = "",
}) => {
  return (
    <div className="product-card-image">
      <Link href={`${PRODUCT_DETAIL}/1`}>
        <Image
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          rootClassName={imageResponsiveClassName}
          alt="product"
        />
      </Link>
      <Badge shape="square" color="blue" rootClassName="image-badge">
        New
      </Badge>
    </div>
  );
};

export default ProductCardImage;
