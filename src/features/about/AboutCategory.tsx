import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";
import { CarouselItems } from "@/components/UI/Carousel/type";
import useSubCategoryStore from "@/store/SubCategoryStore";
import Link from "next/link";

const { Section, Image, Carousel, Grid, Typography } = UI;

const { Row, Col } = Grid;

const { Title, Paragraph } = Typography;

const { Horizontal } = Carousel;

interface AboutCategoryProps {
  lang: Lang;
}

const AboutCategory: React.FC<AboutCategoryProps> = ({ lang }) => {
  const subcategories = useSubCategoryStore((state) => state.subcategories);

  const renderCategory = (start: number, end: number) => {
    return subcategories.slice(start, end).map((subcategory) => (
      <Col key={subcategory.id} xs={12} md={8} lg={6} span={4}>
        <Link href="/about" className="item-inner">
          <Image src={subcategory.path} imgWidth={150} />
          <Paragraph rootClassName="inner-name">{subcategory.name}</Paragraph>
        </Link>
      </Col>
    ));
  };

  const slides: CarouselItems = [
    {
      id: "1",
      content: (
        <div className="carousel-item">
          <Row justify="center">{renderCategory(0, 12)}</Row>
        </div>
      ),
    },
    {
      id: "2",
      content: (
        <div className="carousel-item">
          <Row justify="center">{renderCategory(12, subcategories.length)}</Row>
        </div>
      ),
    },
  ];

  return (
    <Section rootClassName="about-category">
      <Title align="center" weight={700} rootClassName="category-title">
        {lang.about.category.title}
      </Title>
      <Paragraph align="center" rootClassName="category-content" size={18} weight={400}>
        {lang.about.category.content}
      </Paragraph>
      <Horizontal slideId="category" hasArrow={false} items={slides} rootClassName="category-carousel" />
    </Section>
  );
};

export default AboutCategory;
