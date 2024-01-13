import { NextPage } from "next";
import { UI } from "@/components";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { useLang } from "@/hooks";
import ProductCard from "@/components/Page/ProductCard";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME } = url;

const { Breadcrumb, Card, Pagination, Typography, Grid } = UI;

const { Row, Col } = Grid;

const { Title } = Typography;

const Search: NextPage = () => {
  const { lang } = useLang();

  const items: BreadcrumbItems = [
    { id: "1", label: <Link href={HOME}>{lang.common.menu.home}</Link> },
    { id: "2", label: `${lang.search.results} 'Product'`, actived: true },
  ];

  return (
    <div className="page search">
      <Breadcrumb items={items} />
      <Title level={4} weight={600}>
        {lang.search.results} 'Product'
      </Title>
      <Card rootClassName="search-wrap" bodyClassName="wrap-list">
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

export default Search;
