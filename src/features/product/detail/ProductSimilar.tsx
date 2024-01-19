import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { Product } from "@/services/product/type";
import ProductCard from "@/components/Page/ProductCard";

const { Divider, Typography, Grid } = UI;

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface ProductSimilarProps {
  lang: Lang;
  products: Product[];
}

const ProductSimilar: React.FC<ProductSimilarProps> = ({ lang, products }) => {
  return (
    <React.Fragment>
      <Paragraph strong size={16}>
        {lang.product.detail.similar}
      </Paragraph>
      <Divider />
      <div className="detail-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} imgHeight={200} responsive />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductSimilar;
