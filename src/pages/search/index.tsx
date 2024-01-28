import { NextPage } from "next";
import { Breadcrumb, Card, Pagination, Typography, Grid } from "@/components/UI";
import { useLang } from "@/hooks";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import ProductCard from "@/components/Page/ProductCard";
import Link from "next/link";
import url from "@/common/constant/url";
import { Product } from "@/services/product/type";

const { HOME } = url;

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
      <Card bodyClassName="search-wrap">
        <div className="wrap-list">
          {[...Array(40)].map((_, idx) => (
            <ProductCard key={idx} product={{} as Product} imgHeight={200} responsive />
          ))}
        </div>

        <Pagination ghost color="green" shape="square" rootClassName="list-pagination" />
      </Card>
    </div>
  );
};

export default Search;
