import { NextPage } from "next";
import { UI } from "@/components";
import { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { useLang } from "@/hooks";
import Link from "next/link";
import ProductCard from "@/components/Page/ProductCard";
import ProductsFilter from "@/features/product/list/ProductsFilter";
import url from "@/common/constant/url";

const { HOME } = url;

const { Breadcrumb, Card, Pagination, Grid, Typography } = UI;

const { Title } = Typography;

const { Row, Col } = Grid;

const Products: NextPage = () => {
  const { lang } = useLang();

  const items: BreadcrumbItems = [
    { id: "1", label: <Link href={HOME}>{lang.common.menu.home}</Link> },
    { id: "2", label: "Category", actived: true },
  ];

  return (
    <div className="page product-list">
      <Breadcrumb items={items} />
      <Row justify="between">
        <Col>
          <Title level={4} weight={600}>
            Category
          </Title>
        </Col>
        <Col>
          <ProductsFilter lang={lang} />
        </Col>
      </Row>
      <Card rootClassName="list-wrap" bodyClassName="wrap-body">
        <Row justify="between" gutters={[14]}>
          {[...Array(40)].map((_, idx) => (
            <Col key={idx} xs={24} md={12} lg={8} span={6}>
              <ProductCard imgHeight={200} responsive />
            </Col>
          ))}
        </Row>

        <Pagination ghost color="green" shape="square" rootClassName="list-pagination" />
      </Card>
    </div>
  );
};

export default Products;
