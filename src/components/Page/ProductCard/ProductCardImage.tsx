import React from "react";
import { UI } from "@/components";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import url from "@/common/constant/url";
import utils from "@/utils";

const { PRODUCT_DETAIL } = url;

const { Image, Badge } = UI;

interface ProductCardImageProps {
  link: Url;
  isNew: boolean;
  imgWidth: number | string;
  imgHeight: number | string;
  rootClassName?: string;
  imageResponsiveClassName?: string;
}

const ProductCardImage: React.FC<ProductCardImageProps> = ({
  link,
  isNew,
  imgWidth,
  imgHeight,
  rootClassName = "",
  imageResponsiveClassName = "",
}) => {
  const mainClassName = utils.formatClassName("card-image", rootClassName);

  return (
    <div className={mainClassName}>
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
