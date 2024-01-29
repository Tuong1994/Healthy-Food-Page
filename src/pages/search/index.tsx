import { Fragment } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Breadcrumb, Card, Empty, Pagination, Typography } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { Product } from "@/services/product/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import { getProductsPaging } from "@/services/product/api";
import ProductCard from "@/components/Page/ProductCard";
import Link from "next/link";
import url from "@/common/constant/url";
import NoDataError from "@/components/Page/Error/NoDataError";

const { HOME, SEARCH } = url;

const { Title } = Typography;

interface SearchProps {
  productsResponse: ApiResponse<Paging<Product>>;
}

const Search: NextPage<SearchProps> = ({ productsResponse }) => {
  const { locale, lang } = useLang();

  const { query, push: routerPush } = useRouter();

  const searchResult = `“${query.keywords}”`;

  const items: BreadcrumbItems = [
    {
      id: "1",
      label: <Link href={{ pathname: HOME, query: { langCode: locale } }}>{lang.common.menu.home}</Link>,
    },
    { id: "2", label: `${lang.search.results} ${searchResult}`, actived: true },
  ];

  const handleChangePage = (page: number) => {
    routerPush({ pathname: SEARCH, query: { ...query, page } });
  };

  const renderContent = () => {
    if (!productsResponse) return <NoDataError />;
    const { success, data } = productsResponse;
    if (!success) return <NoDataError />;
    if (data && data.items && !data.items.length) return <Empty text={lang.search.empty} />;
    return (
      <Fragment>
        <div className="wrap-list">
          {data.items.map((product) => (
            <ProductCard key={product.id} product={product} imgHeight={200} responsive />
          ))}
        </div>
        <Pagination
          ghost
          color="green"
          shape="square"
          rootClassName="list-pagination"
          total={data.totalItems ?? 0}
          limit={Number(query.limit)}
          onChangePage={handleChangePage}
        />
      </Fragment>
    );
  };

  return (
    <div className="page search">
      <Breadcrumb items={items} />
      <Title level={4} weight={600}>
        {lang.search.results} {searchResult}
      </Title>
      <Card bodyClassName="search-wrap">{renderContent()}</Card>
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const apiQuery: ApiQuery = { ...query };
  const productsResponse = await getProductsPaging(apiQuery);
  return {
    props: {
      productsResponse,
    },
  };
};
