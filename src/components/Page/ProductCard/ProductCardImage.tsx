import { FC } from "react";
import { Image, Badge } from "@/components/UI";
import { useLang } from "@/hooks";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import utils from "@/utils";

interface ProductCardImageProps {
  link: Url;
  isNew: boolean;
  imgWidth: number | string;
  imgHeight: number | string;
  rootClassName?: string;
  imageResponsiveClassName?: string;
}

const ProductCardImage: FC<ProductCardImageProps> = ({
  link,
  isNew,
  imgWidth,
  imgHeight,
  rootClassName = "",
  imageResponsiveClassName = "",
}) => {
  const { lang } = useLang();

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
          {lang.common.status.new}
        </Badge>
      )}
    </div>
  );
};

export default ProductCardImage;
