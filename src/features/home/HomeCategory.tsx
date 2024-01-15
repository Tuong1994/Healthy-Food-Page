import React from "react";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import Link from "next/link";
import ProductCard from "@/components/Page/ProductCard";

const { Empty, Typography, Grid } = UI;

const { Title } = Typography;

const { Row, Col } = Grid;

interface HomeCategoryProps {}

const HomeCategory: React.FC<HomeCategoryProps> = () => {
  const { lang } = useLang();

  const renderProducts = () => {
    // return <Empty text="No Data" />;
    return [...Array(10)].map((_, idx) => <ProductCard key={idx} cardWidth={200} />);
  };

  return (
    <div className="home-category">
      <Row justify="between" align="middle">
        <Col>
          <Title level={5} weight={600} rootClassName="category-name">
            Category Name
          </Title>
        </Col>
        <Col>
          <Link href="/product/list" className="category-link">
            {lang.home.link}
          </Link>
        </Col>
      </Row>

      <div className="category-products">{renderProducts()}</div>
    </div>
  );
};

export default HomeCategory;
