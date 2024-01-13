import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { HiShoppingCart } from "react-icons/hi2";
import ProductCardControl from "@/components/Page/ProductCard/ProductCardControl";
import ProductCardLike from "@/components/Page/ProductCard/ProductCardLike";
import Rate from "@/components/Page/Rate";

const { Space, Divider, Button, Badge, Image, InfoRow, Grid, Typography } = UI;

const { Title, Paragraph } = Typography;

const { Row, Col } = Grid;

interface ProductInfoProps {
  lang: Lang;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ lang }) => {
  return (
    <Row justify="between" rootClassName="detail-info">
      <Col xs={24} md={12} lg={10} span={8}>
        <div className="info-image">
          <Image imgWidth="100%" />
          <Badge shape="square" color="blue" rootClassName="image-badge">
            New
          </Badge>
          <ProductCardLike />
        </div>
      </Col>
      <Col xs={24} md={12} lg={14} span={16}>
        <Title level={6} rootClassName="info-name">
          Product name
        </Title>
        <Paragraph strong size={25} rootClassName="info-price">
          $100,000/kg
        </Paragraph>

        <Divider />
        
        <InfoRow label={lang.common.form.label.unit} text="Kg" />
        <InfoRow label={lang.common.form.label.status} text={lang.common.status.inStock} />
        <InfoRow label={lang.common.form.label.origin} text="Vietnam" />
        <InfoRow
          label={lang.common.form.label.supplier}
          text="Healthy Food"
          textProps={{ variant: "success" }}
        />

        <Rate />

        <Divider />

        <Space align="middle" size="lg">
          <ProductCardControl />
          <Button color="green" sizes="lg">
            <Space align="middle">
              <HiShoppingCart />
              <span>{lang.product.detail.purchase}</span>
            </Space>
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default ProductInfo;
