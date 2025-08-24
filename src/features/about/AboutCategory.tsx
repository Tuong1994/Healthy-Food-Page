import { FC } from "react";
import { Section, Image, Carousel, Grid, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { CarouselItems } from "@/components/UI/Carousel/type";
import type { ApiResponse, List } from "@/services/type";
import type { SubCategory } from "@/services/subcategory/type";
import { ESort } from "@/common/enum";
import { LIST_LIMIT_ITEMS } from "@/services/helper";
import { useRouter } from "next/router";
import NoDataError from "@/components/Page/Error/NoDataError";
import Link from "next/link";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

const { Row, Col } = Grid;

const { Title, Paragraph } = Typography;

const { Horizontal } = Carousel;

interface AboutCategoryProps {
  lang: Lang;
  subCategoriesResponse: ApiResponse<List<SubCategory>>;
}

const AboutCategory: FC<AboutCategoryProps> = ({ lang, subCategoriesResponse }) => {
  const response = subCategoriesResponse;

  const { query } = useRouter();

  const renderCategory = (start: number, end: number) => {
    if (!response.success) return <NoDataError />;
    const subCategories = response.data ? response.data.items : [];
    return subCategories.slice(start, end).map((subCategory) => (
      <Col key={subCategory.id} xs={12} md={8} lg={6} span={4}>
        <Link
          href={{
            pathname: PRODUCT_LIST,
            query: {
              page: 1,
              limit: LIST_LIMIT_ITEMS,
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              sortBy: ESort.PRICE_GO_UP,
              ...query,
            },
          }}
          className="item-inner"
        >
          <Image imgWidth={150} />
          <Paragraph rootClassName="inner-name">{subCategory.name}</Paragraph>
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
          <Row justify="center">{renderCategory(12, 24)}</Row>
        </div>
      ),
    },
    {
      id: "3",
      content: (
        <div className="carousel-item">
          <Row justify="center">{renderCategory(24, 36)}</Row>
        </div>
      ),
    },
    {
      id: "4",
      content: (
        <div className="carousel-item">
          <Row justify="center">{renderCategory(36, response.data?.items?.length)}</Row>
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
