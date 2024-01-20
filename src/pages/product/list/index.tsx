import { Fragment, useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Breadcrumb, Card, Pagination, Empty, Grid, Typography } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import type { Product } from "@/services/product/type";
import type { Category } from "@/services/category/type";
import type { SubCategory } from "@/services/subcategory/type";
import { defaultApiResponse } from "@/services";
import { getSubCategory } from "@/services/subcategory/api";
import { getProductsPaging } from "@/services/product/api";
import { getCategory } from "@/services/category/api";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import ProductCard from "@/components/Page/ProductCard";
import ProductsFilter from "@/features/product/list/ProductsFilter";
import NoDataError from "@/components/Page/Error/NoDataError";
import url from "@/common/constant/url";

const { HOME, PRODUCT_LIST } = url;

const { Title } = Typography;

const { Row, Col } = Grid;

interface ProductsProps {
  categoryResponse: ApiResponse<Category>;
  subCategoryResponse: ApiResponse<SubCategory>;
  productsResponse: ApiResponse<Paging<Product>>;
}

const Products: NextPage<ProductsProps> = ({ categoryResponse, subCategoryResponse, productsResponse }) => {
  const { lang } = useLang();

  const { query, push: routerPush } = useRouter();

  const categoryName = useMemo(() => {
    if (categoryResponse && !categoryResponse.success) return "";
    return categoryResponse.data.name;
  }, [categoryResponse, categoryResponse?.data?.name]);

  const subCategoryName = useMemo(() => {
    if (subCategoryResponse && !subCategoryResponse.success) return "";
    return subCategoryResponse.data.name;
  }, [subCategoryResponse, subCategoryResponse?.data?.name]);

  const pageTitle = useMemo(() => {
    if (!subCategoryName) return categoryName;
    return `${categoryName} - ${subCategoryName}`;
  }, [categoryName, subCategoryName]);

  const breadCrumbItems = () => {
    let items: BreadcrumbItems = [{ id: "1", label: <Link href={HOME}>{lang.common.menu.home}</Link> }];
    if (categoryName && !subCategoryName) {
      items = [...items, { id: categoryName, label: categoryName, actived: true }];
    } else {
      items = [
        ...items,
        {
          id: categoryName,
          label: (
            <Link
              href={{
                pathname: PRODUCT_LIST,
                query: { ...query, categoryId: categoryResponse.data.id, subCategoryId: "" },
              }}
            >
              {categoryName}
            </Link>
          ),
        },
        { id: subCategoryName, label: subCategoryName, actived: true },
      ];
    }
    return items;
  };

  const handleChangePage = (page: number) => {
    routerPush({ pathname: PRODUCT_LIST, query: { ...query, page } });
  };

  const renderContent = () => {
    if (productsResponse && !productsResponse.success)
      return (
        <div className="error-wrapper">
          <NoDataError />
        </div>
      );
    const products: Product[] = productsResponse.data.items ? productsResponse.data.items : [];
    if (!products.length) return <Empty text={lang.common.description.empty} />;
    return (
      <Fragment>
        <div className="body-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} imgHeight={200} responsive />
          ))}
        </div>

        <Pagination
          ghost
          color="green"
          shape="square"
          rootClassName="list-pagination"
          total={productsResponse.data.totalItems ?? 0}
          limit={12}
          onChangePage={handleChangePage}
        />
      </Fragment>
    );
  };

  return (
    <div className="page product-list">
      <Breadcrumb items={breadCrumbItems()} />
      <Row justify="between">
        <Col>
          <Title level={4} weight={600}>
            {pageTitle}
          </Title>
        </Col>
        <Col>
          <ProductsFilter lang={lang} />
        </Col>
      </Row>
      <Card rootClassName="list-wrap" bodyClassName="wrap-body">
        {renderContent()}
      </Card>
    </div>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const apiQuery = { ...query } as ApiQuery;
  let categoryResponse: ApiResponse<Category> = defaultApiResponse<Category>();
  let subCategoryResponse: ApiResponse<SubCategory> = defaultApiResponse<SubCategory>();

  if (apiQuery.categoryId)
    categoryResponse = await getCategory({ categoryId: apiQuery.categoryId, langCode: apiQuery.langCode });
  if (apiQuery.subCategoryId)
    subCategoryResponse = await getSubCategory({
      subCategoryId: apiQuery.subCategoryId,
      langCode: apiQuery.langCode,
    });
  const productsResponse = await getProductsPaging({ ...apiQuery });

  return {
    props: {
      productsResponse,
      categoryResponse,
      subCategoryResponse,
    },
  };
};
