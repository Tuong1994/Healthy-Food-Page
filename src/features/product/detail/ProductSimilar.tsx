import { FC, Fragment } from "react";
import { Divider, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Product } from "@/services/product/type";
import ProductCard from "@/components/Page/ProductCard";

const { Paragraph } = Typography;

interface ProductSimilarProps {
  lang: Lang;
  products: Product[];
}

const ProductSimilar: FC<ProductSimilarProps> = ({ lang, products = [] }) => {
  return (
    <Fragment>
      <Paragraph strong size={16}>
        {lang.product.detail.similar}
      </Paragraph>
      <Divider />
      <div className="detail-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} responsive />
        ))}
      </div>
    </Fragment>
  );
};

export default ProductSimilar;
