import { FC } from "react";
import { Space, Divider, Badge, Image, InfoRow, Grid, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Product } from "@/services/product/type";
import { InfoRowProps } from "@/components/UI/InfoRow";
import { ELang } from "@/common/enum";
import Quantity from "@/components/Page/Quantity";
import Rate from "@/components/Page/Rate";
import Like from "@/components/Page/Like";
import getDisplayProductUnit from "../data-display/getDisplayProductUnit";
import getDisplayInventoryStatus from "../data-display/getDisplayInventoryStatus";
import getDisplayProductOrigin from "../data-display/getDisplayProductOrigin";
import utils from "@/utils";

const { Title, Paragraph } = Typography;

const { Row, Col } = Grid;

interface ProductInfoProps {
  locale: ELang;
  lang: Lang;
  product: Product;
}

const ProductInfo: FC<ProductInfoProps> = ({ locale, lang, product }) => {
  const infoRowDefaultProps: InfoRowProps = {
    labelProps: { size: 16 },
    labelSpanProps: { xs: 8, md: 8, lg: 8, span: 4 },
    textProps: { size: 16 },
  };

  return (
    <Row justify="between" rootClassName="detail-info">
      <Col xs={24} md={12} lg={10} span={6}>
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
      <Col xs={24} md={12} lg={14} span={18}>
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
          {...infoRowDefaultProps}
          rootClassName="info-group"
          label={lang.product.detail.category}
          text={product.category?.name}
        />
        <InfoRow
          {...infoRowDefaultProps}
          rootClassName="info-group"
          label={lang.common.form.label.supplier}
          text={product.supplier}
          textProps={{ variant: "success" }}
        />
        <InfoRow
          {...infoRowDefaultProps}
          rootClassName="info-group"
          label={lang.common.form.label.unit}
          textElement={getDisplayProductUnit(lang, product.unit)}
        />
        <InfoRow
          {...infoRowDefaultProps}
          rootClassName="info-group"
          label={lang.common.form.label.status}
          textElement={getDisplayInventoryStatus(lang, product.inventoryStatus)}
        />
        <InfoRow
          {...infoRowDefaultProps}
          label={lang.common.form.label.origin}
          textElement={getDisplayProductOrigin(lang, product.origin)}
        />

        <Divider />

        <Rate product={product} />
      </Col>
    </Row>
  );
};

export default ProductInfo;
