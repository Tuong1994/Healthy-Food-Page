import React from "react";
import { Lang } from "@/common/type";
import { UI } from "@/components";

const { Section, Grid, Typography } = UI;

const { Title, Paragraph } = Typography;

const { Row, Col } = Grid;

interface AboutGuaranteeProps {
  lang: Lang;
}

const AboutGuarantee: React.FC<AboutGuaranteeProps> = ({ lang }) => {
  return (
    <Section rootClassName="about-guarantee">
      <Title align="center" weight={700} rootClassName="guarantee-title">
        {lang.about.guarantee.title}
      </Title>
      <Row justify="evenly" gutters={[50, 10]}>
        <Col xs={24} span={8}>
          <Paragraph variant="success" weight={700} size={50} align="center">
            99.5%
          </Paragraph>
          <Paragraph size={18} align="center" rootClassName="guarantee-content">
            {lang.about.guarantee.content_1}
          </Paragraph>
        </Col>
        <Col xs={24} span={8}>
          <Paragraph variant="success" weight={700} size={50} align="center">
            99.0%
          </Paragraph>
          <Paragraph size={18} align="center" rootClassName="guarantee-content">
            {lang.about.guarantee.content_2}
          </Paragraph>
        </Col>
        <Col xs={24} span={8}>
          <Paragraph variant="success" weight={700} size={50} align="center">
            98.0%
          </Paragraph>
          <Paragraph size={18} align="center" rootClassName="guarantee-content">
            {lang.about.guarantee.content_3}
          </Paragraph>
        </Col>
      </Row>
    </Section>
  );
};

export default AboutGuarantee;
