import { FC } from "react";
import { Loading, Grid } from "@/components/UI";

const { Row, Col } = Grid;

const { Skeleton } = Loading;

const FooterLoading: FC<{}> = () => {
  return (
    <Row>
      {[...Array(8)].map((_, idx) => (
        <Col key={idx} lg={12} span={6}>
          <Skeleton type="paragraph" options={{ lines: 1, width: 80 }} />
          <Row>
            {[...Array(4)].map((_, idx) => (
              <Col key={idx} span={6}>
                <Skeleton type="paragraph" options={{ lines: 1, width: 60, height: 8 }} />
              </Col>
            ))}
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default FooterLoading;
