import { FC } from "react";
import { Space, Divider, Button, Badge, Image, InfoRow, Grid, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Product } from "@/services/product/type";
import { HiShoppingCart } from "react-icons/hi2";
import { ELang } from "@/common/enum";
import { useDisplayInventoryStatus, useDisplayProductOrigin, useDisplayProductUnit } from "@/hooks";
import QuantityControl from "@/components/Page/QuantityControl";
import ProductCardLike from "@/components/Page/ProductCard/ProductCardLike";
import Rate from "@/components/Page/Rate";
import utils from "@/utils";

const { Title, Paragraph } = Typography;

const { Row, Col } = Grid;

interface ProductInfoProps {
  locale: ELang;
  lang: Lang;
  product: Product;
}

const ProductInfo: FC<ProductInfoProps> = ({ locale, lang, product }) => {
  return (
    <Row justify="between" rootClassName="detail-info">
      <Col xs={24} md={12} lg={10} span={8}>
        <div className="info-image">
          <Image imgWidth="100%" />
          {product.isNew && (
            <Badge shape="square" color="blue" rootClassName="image-badge">
              {lang.common.status.new}
            </Badge>
          )}
          <ProductCardLike />
        </div>
      </Col>
      <Col xs={24} md={12} lg={14} span={16}>
        <Title level={6} rootClassName="info-name">
          {product.name}
        </Title>
        <Paragraph strong size={25} rootClassName="info-price">
          {utils.formatPrice(locale, product.totalPrice)}
        </Paragraph>

        <Divider />

        <InfoRow
          rootClassName="info-group"
          label={lang.product.detail.category}
          text={product.category?.name}
        />
        <InfoRow
          rootClassName="info-group"
          label={lang.common.form.label.supplier}
          text={product.supplier}
          textProps={{ variant: "success" }}
        />
        <InfoRow
          rootClassName="info-group"
          label={lang.common.form.label.unit}
          textElement={useDisplayProductUnit(product.unit)}
        />
        <InfoRow
          rootClassName="info-group"
          label={lang.common.form.label.status}
          textElement={useDisplayInventoryStatus(product.inventoryStatus)}
        />
        <InfoRow
          label={lang.common.form.label.origin}
          textElement={useDisplayProductOrigin(product.origin)}
        />

        <Rate />

        <Divider />

        <Space align="middle" size="lg">
          <QuantityControl productId={product.id as string} />
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
