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
      <Row>
        {products.map((product, idx) => (
          <Col key={idx} xs={24} md={12} lg={8} span={6}>
            <ProductCard product={product} imgHeight={200} responsive />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default ProductSimilar;
