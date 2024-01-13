import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";

const { Section, Image, Grid, Typography } = UI;

const { Row, Col } = Grid;

const { Title, Paragraph } = Typography;

interface AboutBlogProps {
  lang: Lang;
}

const AboutBlog: React.FC<AboutBlogProps> = ({ lang }) => {
  return (
    <Section rootClassName="about-blog">
      <Row gutters={[30, 10]} justify="between" rootClassName="blog-group">
        <Col xs={24} md={24} lg={11} span={10}>
          <Image src="/about/about-blog-1.webp" imgWidth="100%" />
        </Col>
        <Col xs={24} md={24} lg={13} span={13}>
          <Title weight={600}>{lang.about.blogs.title_1}</Title>
          <Paragraph size={16} align="justify" lineHeight={30}>
            {lang.about.blogs.content_1}
          </Paragraph>
        </Col>
      </Row>

      <Row gutters={[30, 10]} justify="between" rootClassName="blog-group">
        <Col xs={24} md={24} lg={13} span={13}>
          <Title weight={600}>{lang.about.blogs.title_2}</Title>
          <Paragraph size={16} align="justify" lineHeight={30}>
            {lang.about.blogs.content_2}
          </Paragraph>
        </Col>
        <Col xs={24} md={24} lg={11} span={10}>
          <Image src="/about/laptop-no-background.webp" imgWidth="100%" />
        </Col>
      </Row>

      <Row gutters={[30, 10]} justify="between" rootClassName="blog-group">
        <Col xs={24} md={24} lg={11} span={10}>
          <Image src="/about/about-blog-1.webp" imgWidth="100%" />
        </Col>
        <Col xs={24} md={24} lg={13} span={13}>
          <Title weight={600}>{lang.about.blogs.title_3}</Title>
          <Paragraph size={16} align="justify" lineHeight={30}>
            {lang.about.blogs.content_3}
          </Paragraph>
        </Col>
      </Row>
    </Section>
  );
};

export default AboutBlog;
