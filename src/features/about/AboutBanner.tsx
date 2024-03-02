import { FC } from "react";
import { Section, Button, Image, Space, UList, Grid, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import Link from "next/link";
import url from "@/common/constant/url";

const { CONTACT } = url;

const { Row, Col } = Grid;

const { Title, Paragraph } = Typography;

const { List, ListItem } = UList;

interface AboutBannerProps {
  lang: Lang;
}

const AboutBanner: FC<AboutBannerProps> = ({ lang }) => {
  return (
    <Section rootClassName="about-banner">
      <Row justify="between">
        <Col xs={24} md={24} lg={13} span={12}>
          <Title weight={700} rootClassName="banner-title">
            {lang.about.banner.title}
          </Title>
          <Paragraph size={17} weight={300} align="justify">
            {lang.about.banner.content}
          </Paragraph>
          <Link href={CONTACT}>
            <Button color="green" sizes="lg" rootClassName="banner-btn">
              {lang.about.banner.action}
            </Button>
          </Link>
          <List>
            <ListItem>
              <Space>
                <Paragraph strong size={18}>
                  {lang.about.banner.delivery}
                </Paragraph>
                <Paragraph italic>({lang.about.banner.term})</Paragraph>
              </Space>
            </ListItem>
            <ListItem>
              <Paragraph strong size={18}>
                {lang.about.banner.fresh}
              </Paragraph>
            </ListItem>
            <ListItem>
              <Paragraph strong size={18}>
                {lang.about.banner.deal}
              </Paragraph>
            </ListItem>
          </List>
        </Col>
        <Col xs={0} md={0} lg={10} span={10}>
          <Image imgWidth="100%" src="/about/about-banner.webp" />
        </Col>
      </Row>
    </Section>
  );
};

export default AboutBanner;
