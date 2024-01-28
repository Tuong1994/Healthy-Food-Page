import { FC } from "react";
import { Space, Divider, Badge, Image, InfoRow, Grid, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Product } from "@/services/product/type";
import { ELang } from "@/common/enum";
import { useDisplayInventoryStatus, useDisplayProductOrigin, useDisplayProductUnit } from "@/hooks";
import Quantity from "@/components/Page/Quantity";
import Rate from "@/components/Page/Rate";
import Like from "@/components/Page/Like";
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
          <Like product={product} />
        </div>
      </Col>
      <Col xs={24} md={12} lg={14} span={16}>
        <Title level={6} rootClassName="info-name">
          {product.name}
        </Title>
        <Space align="middle" size="lg">
          <Paragraph strong size={25} rootClassName="info-price">
            {utils.formatPrice(locale, product.totalPrice)}
          </Paragraph>
          <Quantity productId={product.id as string} />
        </Space>

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

        <Divider />

        <Rate product={product} />
      </Col>
    </Row>
  );
};

export default ProductInfo;
