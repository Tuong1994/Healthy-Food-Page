import { FC, Fragment } from "react";
import { Card, Space, Grid, Loading } from "@/components/UI";

const { Skeleton } = Loading;

const { Row, Col } = Grid;

const CartLoading: FC<{}> = () => {
  return (
    <Fragment>
      <Skeleton type="title" />
      <Card
        headStyle={{ padding: "1rem" }}
        bodyStyle={{ padding: "1rem" }}
        head={
          <Row justify="between">
            {[...Array(4)].map((_, idx) => (
              <Col key={idx} span={6}>
                <Skeleton type="paragraph" options={{ lines: 1, width: "100%" }} />
              </Col>
            ))}
          </Row>
        }
      >
        <Skeleton type="paragraph" options={{ lines: 5, width: "100%" }} />
      </Card>
      <Space justify="end" style={{ marginTop: "1rem" }}>
        <Skeleton type="button" options={{ width: 300 }} />
      </Space>
    </Fragment>
  );
};

export default CartLoading;
