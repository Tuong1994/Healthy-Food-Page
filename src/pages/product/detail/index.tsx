import { Breadcrumb } from "@/components/UI";
import { GetServerSideProps, NextPage } from "next";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { ApiResponse, Paging } from "@/services/type";
import type { Product as ProductType } from "@/services/product/type";
import { getProduct, getProductsPaging } from "@/services/product/api";
import { defaultApiResponse } from "@/services";
import { ELang } from "@/common/enum";
import { useLang } from "@/hooks";
import Link from "next/link";
import ProductInfo from "@/features/product/detail/ProductInfo";
import ProductSimilar from "@/features/product/detail/ProductSimilar";
import ProductTabs from "@/features/product/detail/ProductTabs";
import url from "@/common/constant/url";

const { HOME, PRODUCT_LIST } = url;

interface ProductPageProps {
  productResponse: ApiResponse<ProductType>;
  productsResponse: ApiResponse<Paging<ProductType>>;
}

const ProductPage: NextPage<ProductPageProps> = ({ productResponse, productsResponse }) => {
  const { locale, lang } = useLang();

  const product = productResponse.data;

  const similarProducts = productsResponse.data.items;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link href={HOME}>{lang.common.menu.home}</Link> },
    {
      id: "2",
      label: (
        <Link
          href={{
            pathname: PRODUCT_LIST,
            query: { page: 1, limit: 12, categoryId: product.categoryId, langCode: locale },
          }}
        >
          {product.category?.name}
        </Link>
      ),
    },
    { id: "3", label: product.name, actived: true },
  ];

  return (
    <div className="page product-detail">
      <Breadcrumb items={items} />
      <ProductInfo locale={locale} lang={lang} product={product} />
      <ProductTabs lang={lang} />
      <ProductSimilar lang={lang} products={similarProducts} />
    </div>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const apiQuery = { productId: query.id as string, langCode: query.langCode as ELang };

  const productResponse = await getProduct(apiQuery);
  let productsResponse: ApiResponse<Paging<ProductType>> = defaultApiResponse<Paging<ProductType>>();
  if (productResponse && productResponse.success)
    productsResponse = await getProductsPaging({
      page: 1,
      limit: 12,
      langCode: query.langCode as ELang,
      categoryId: productResponse.data.categoryId,
    });

  return {
    props: {
      productResponse,
      productsResponse,
    },
  };
};
