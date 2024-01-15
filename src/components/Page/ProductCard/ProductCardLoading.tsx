import React from "react";
import { Space, Card, Loading, Grid } from "@/components/UI";
import { useAppGrid } from "@/components/UI/Grid/Provider";

const { Skeleton } = Loading;

const { Row, Col } = Grid;

interface ProductCardLoadingProps {
  responsive: boolean;
  cardSize: () => string;
}

const ProductCardLoading: React.FC<ProductCardLoadingProps> = ({ responsive, cardSize }) => {
  const { isPhone } = useAppGrid();

  if (isPhone && responsive) {
    return (
      <Card>
        <Row>
          <Col xs={10}>
            <Skeleton type="image" options={{ width: "100%", height: 100 }} />
          </Col>
          <Col xs={14}>
            <Skeleton type="paragraph" options={{ lines: 2 }} />
            <Space justify="end">
              <Skeleton type="button" options={{ height: 30 }} />
            </Space>
          </Col>
        </Row>
      </Card>
    );
  }

  return (
    <Card style={{ minWidth: cardSize() }}>
      <Skeleton type="image" options={{ width: "100%", height: 150 }} />
      <Skeleton type="paragraph" options={{ lines: 2 }} />
      <Space justify="end">
        <Skeleton type="button" options={{ height: 30 }} />
      </Space>
    </Card>
  );
};

export default ProductCardLoading;
